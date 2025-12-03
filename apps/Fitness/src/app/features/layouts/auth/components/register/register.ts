// Core
import {Component, inject} from "@angular/core";
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RouterModule} from "@angular/router";

// Shared-components
import {
    FitnessInput,
    FitnessInputGender,
    Gender,
    FitnessInputSlider,
    FitnessFormRadio,
    RadioItem,
} from "@fitness-app/fitness-form";
import {BasicData} from "./components/basic-data/basic-data";
import {SelectGender} from "./components/select-gender/select-gender";

// NgRx
import {Store} from "@ngrx/store";
import {updateRegisterData, register} from "../../store/auth.actions";
import {selectAuthLoading, selectAuthError, selectStep} from "../../store/auth.selectors";
import {SelectOldComponent} from "./components/select-old/select-old";
import {SelectWeightComponent} from "./components/select-weight/select-weight";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [
        BasicData,
        SelectGender,
        ReactiveFormsModule,
        RouterModule,
        SelectOldComponent,
        SelectWeightComponent,
    ],
    templateUrl: "./register.html",
    styleUrl: "./register.scss",
})
export class Register {
    registerForm: FormGroup;

    radioConfig: RadioItem[] = [
        {value: "Gain weight", label: "Gain weight"},
        {value: "lose weight", label: "lose weight"},
        {value: "Get fitter", label: "Get fitter"},
        {value: "Gain more flexible", label: "Gain more flexible"},
    ];

    private store = inject(Store);
    isLoading = this.store.selectSignal(selectAuthLoading);
    error = this.store.selectSignal(selectAuthError);
    step = this.store.selectSignal(selectStep);

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            firstName: ["", [Validators.required, Validators.minLength(2)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });

        this.registerForm.valueChanges.subscribe((value) => {
            this.store.dispatch(updateRegisterData({data: value}));
        });
    }

    submit() {
        if (this.registerForm.valid) {
            this.store.dispatch(register());
        } else {
            this.registerForm.markAllAsTouched();
        }
    }

    onGenderChange(gender: Gender) {
        this.store.dispatch(updateRegisterData({data: {gender}}));
    }

    onWeightChanged(newWeight: number): void {
        this.store.dispatch(updateRegisterData({data: {weight: newWeight}}));
    }

    onActivityLevelChanged(newActivityLevel: string): void {
        this.store.dispatch(updateRegisterData({data: {activityLevel: newActivityLevel}}));
    }
}
