import {Component, inject, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {setStep, updateRegisterData} from "../../../../store/auth.actions";
import {ProgressCircleComponent} from "apps/Fitness/src/app/shared/components/progress-circle/progress-circle";
import {FitnessInputSlider} from "@fitness-app/fitness-form";

@Component({
    selector: "app-select-old",
    standalone: true,
    imports: [CommonModule, TranslatePipe, ProgressCircleComponent, FitnessInputSlider],
    templateUrl: "./select-old.html",
    styleUrl: "./select-old.scss",
})
export class SelectOldComponent {
    private store = inject(Store);
    age = signal<number>(25);

    onAgeChange(age: number) {
        this.age.set(age);
    }

    submit() {
        this.store.dispatch(updateRegisterData({data: {age: this.age()}}));
        this.store.dispatch(setStep({step: 3}));
    }
}
