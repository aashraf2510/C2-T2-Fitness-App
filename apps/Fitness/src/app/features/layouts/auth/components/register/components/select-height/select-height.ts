import {Component, inject, OnInit, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {setStep, updateRegisterData} from "../../../../store/auth.actions";
import {ProgressCircleComponent} from "apps/Fitness/src/app/shared/components/progress-circle/progress-circle";
import {FitnessInputSlider} from "@fitness-app/fitness-form";
import {selectRegisterData} from "../../../../store/auth.selectors";

@Component({
    selector: "app-select-height",
    standalone: true,
    imports: [CommonModule, TranslatePipe, ProgressCircleComponent, FitnessInputSlider],
    templateUrl: "./select-height.html",
    styleUrl: "./select-height.scss",
})
export class SelectHeightComponent implements OnInit {
    private store = inject(Store);
    height = signal<number>(170);

    ngOnInit() {
        this.store.select(selectRegisterData).subscribe((data) => {
            if (data.height) {
                this.height.set(data.height);
            }
        });
    }

    onHeightChange(height: number) {
        this.height.set(height);
    }

    back() {
        this.store.dispatch(setStep({step: 3}));
    }

    submit() {
        this.store.dispatch(updateRegisterData({data: {height: this.height()}}));
        this.store.dispatch(setStep({step: 5}));
    }
}
