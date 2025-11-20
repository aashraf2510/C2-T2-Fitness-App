import {NgOptimizedImage} from "@angular/common";
import {Component, inject, signal, WritableSignal} from "@angular/core";
import {SeoService} from "./../../../../../core/services/seo/seo.service";
import {TranslatePipe} from "@ngx-translate/core";

export interface StepsKeys {
    id: string;
    header: string;
    paragraph: string;
}
export interface TrainersKeys {
    name: string;
    width: number;
    height: number;
    alt: string;
    specialty: string;
    description: string;
}

@Component({
    selector: "app-why-us",
    imports: [NgOptimizedImage, TranslatePipe],
    templateUrl: "./why-us.html",
    styleUrl: "./why-us.scss",
})
export class WhyUs {
    private seo = inject(SeoService);
    steps: WritableSignal<StepsKeys[] | undefined> = signal(undefined);
    trainersCol1: WritableSignal<TrainersKeys[] | undefined> = signal(undefined);
    trainersCol2: WritableSignal<TrainersKeys[] | undefined> = signal(undefined);

    constructor() {
        this.seo.update(
            "Why Us | FitZone",
            "Discover why FitZone is the ideal place to achieve your fitness goals. Enjoy personalized workout plans, certified trainers, modern equipment, and a supportive community designed to elevate your fitness journey."
        );
        this.steps.set([
            {
                id: "why-us.step1.id",
                header: "why-us.step1.header",
                paragraph: "why-us.step1.paragraph",
            },
            {
                id: "why-us.step2.id",
                header: "why-us.step2.header",
                paragraph: "why-us.step2.paragraph",
            },
            {
                id: "why-us.step3.id",
                header: "why-us.step3.header",
                paragraph: "why-us.step3.paragraph",
            },
        ]);
        this.trainersCol1.set([
            {
                name: "trainer-1",
                width: 2000,
                height: 1333,
                alt: "Certified personal trainer guiding client through customized workout routine",
                specialty: "personal training",
                description: "Expert trainer focusing on individualized fitness programs",
            },
            {
                name: "trainer-2",
                width: 291,
                height: 344,
                alt: "Experienced trainer assisting with advanced fitness equipment usage",
                specialty: "equipment training",
                description: "Expert in modern gym equipment and functional training",
            },
        ]);
        this.trainersCol2.set([
            {
                name: "trainer-3",
                width: 304,
                height: 286,
                alt: "Fitness instructor demonstrating proper strength training technique",
                specialty: "strength training",
                description: "Specialized in weight lifting and muscle building techniques",
            },
            {
                name: "trainer-4",
                width: 2000,
                height: 1333,
                alt: "Professional fitness coach demonstrating proper exercise form and technique",
                specialty: "exercise technique",
                description: "Specialized in form correction and movement optimization",
            },
        ]);
    }
}
