import {createAction, props} from "@ngrx/store";
import {SignInResponse, ErrorResponse} from "auth-api-kp";
import {RegisterData} from "./auth.reducer";

export const updateRegisterData = createAction(
    "[Auth] Update Register Data",
    props<{data: Partial<RegisterData>}>()
);

export const register = createAction("[Auth] Register");

export const registerSuccess = createAction(
    "[Auth] Register Success",
    props<{response: SignInResponse}>()
);

export const registerFailure = createAction("[Auth] Register Failure", props<{error: string}>());

export const setStep = createAction("[Auth] Set Step", props<{step: number}>());
