import {GoogleGenAI, HarmCategory, HarmBlockThreshold} from "@google/genai";

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Handle preflight
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({error: "Missing GEMINI_API_KEY"});
        }

        const {messages} = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({error: "Invalid messages format"});
        }

        const ai = new GoogleGenAI({apiKey});

        res.setHeader("Content-Type", "text/plain; charset=utf-8");

        const systemInstruction = `You are an elite fitness coach and nutritionist.
Your name is "Elevate Coach".
Your goal is to help users achieve their fitness goals through scientific, practical, and motivating advice.
Your tone is encouraging, strict when necessary, and always focused on safety and form.
If a user asks about non-fitness topics, politely steer them back to health and wellness.`;

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
        ];

        const recentMessages = messages.slice(-20);

        const stream = await ai.models.generateContentStream({
            model: "gemini-2.0-flash-exp",
            config: {
                systemInstruction,
                safetySettings,
            },
            contents: recentMessages.map((m) => ({
                role: m.role,
                parts: [{text: m.text}],
            })),
        });

        for await (const chunk of stream) {
            if (chunk.text) {
                res.write(chunk.text);
            }
        }

        res.end();
    } catch (error) {
        console.error("Gemini error:", error);
        if (!res.headersSent) {
            res.status(500).json({error: "Gemini API error", details: error.message});
        } else {
            res.end();
        }
    }
}
