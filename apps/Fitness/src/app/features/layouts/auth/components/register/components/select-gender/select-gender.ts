import {Component, inject, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {setStep, updateRegisterData} from "../../../../store/auth.actions";
import {ProgressCircleComponent} from "apps/Fitness/src/app/shared/components/progress-circle/progress-circle";
import { FitnessInputGender } from "@fitness-app/fitness-form";

@Component({
    selector: "app-select-gender",
    standalone: true,
    imports: [CommonModule, TranslatePipe, ProgressCircleComponent, FitnessInputGender],
    templateUrl: "./select-gender.html",
    styleUrl: "./select-gender.scss",
})
export class SelectGender {
    private store = inject(Store);
    selectedGender = signal<string>("male");

    onGenderChange(gender: string) {
        this.selectedGender.set(gender);
    }

    submit() {
            this.store.dispatch(updateRegisterData({data: {gender: this.selectedGender()}}));
            this.store.dispatch(setStep({step: 2}));
    }
}
