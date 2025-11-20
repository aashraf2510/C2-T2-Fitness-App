import { Component, DestroyRef, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TranslateService } from "@ngx-translate/core";
import { AuthApiKpService } from "auth-api-kp";
import { MessageService } from "primeng/api";
import { FitnessInput } from "@fitness-app/fitness-form";

@Component({
    selector: "app-send-email",
    imports: [FitnessInput, ReactiveFormsModule],
    templateUrl: "./send-email.html",
    styleUrl: "./send-email.scss",
})
export class SendEmail {
    private readonly _translate = inject(TranslateService);
    private readonly _authApiKpService = inject(AuthApiKpService);
    private readonly _messageService = inject(MessageService);
    private readonly destroyRef = inject(DestroyRef);
    
    @Output() emailSubmitted = new EventEmitter<string>();
    
    isLoading = signal<boolean>(false);

    forgetPassForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
    });

    forgetpasswordSubmit(): void {
        if (this.forgetPassForm.invalid || this.isLoading()) return;

        this.isLoading.set(true);
        const email = this.forgetPassForm.get("email")?.value ?? "";

        this._authApiKpService
            .forgetPassword(this.forgetPassForm.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    if ("error" in res) {
                        this._messageService.add({
                            severity: "error",
                            detail: this._translate.instant("messagesToast.failedSendCode"),
                            life: 3000,
                        });
                    } else {
                        if (res.message === "success") {
                            this.emailSubmitted.emit(email);
                            this._messageService.add({
                                severity: "success",
                                detail: this._translate.instant("messagesToast.otpSent"),
                                life: 3000,
                            });
                        } else {
                            this._messageService.add({
                                severity: "error",
                                detail: this._translate.instant("messagesToast.verificationFailed"),
                                life: 3000,
                            });
                        }
                    }
                },
                error: () => {
                    this._messageService.add({
                        severity: "error",
                        detail: this._translate.instant("messagesToast.unexpectedError"),
                        life: 3000,
                    });
                },
                complete: () => {
                    this.isLoading.set(false);
                },
            });
    }
}