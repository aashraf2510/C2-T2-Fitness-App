import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {mealCatRes, MealsByCategoryResponse} from "../../models/meals";
import {environment} from "@fitness-app/environment/baseUrl.dev";
import {EndPoint} from "../../../core/enums/endpoin";

@Injectable({
    providedIn: "root",
})
export class MealService {
    private http = inject(HttpClient);

    getMealsCats(): Observable<mealCatRes> {
        return this.http.get<mealCatRes>(`${environment.mealApiUrl}categories.php`);
    }

    getMealsByCategory(cat: string): Observable<MealsByCategoryResponse> {
        return this.http.get<MealsByCategoryResponse>(`${EndPoint.MEALS_BY_CATEGORY}?c=${cat}`);
    }
}
