import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    // One uppercase at least
    const emailRegex = RegExp("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$");
    const valid = emailRegex.test(control.value);

    const errors = {
        email: {
            rules: ''
        }
    };

    return !valid ? errors : null;
}