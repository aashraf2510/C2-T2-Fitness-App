import {Component, inject, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {setStep, updateRegisterData} from "../../../../store/auth.actions";
import {ProgressCircleComponent} from "apps/Fitness/src/app/shared/components/progress-circle/progress-circle";
import {FitnessInputSlider} from "@fitness-app/fitness-form";

@Component({
    selector: "app-select-weight",
    standalone: true,
    imports: [CommonModule, TranslatePipe, ProgressCircleComponent, FitnessInputSlider],
    templateUrl: "./select-weight.html",
    styleUrl: "./select-weight.scss",
})
export class SelectWeightComponent {
    private store = inject(Store);
    weight = signal<number>(90);

    onWeightChange(weight: number) {
        this.weight.set(weight);
    }

    submit() {
        this.store.dispatch(updateRegisterData({data: {weight: this.weight()}}));
        this.store.dispatch(setStep({step: 4}));
    }
}
