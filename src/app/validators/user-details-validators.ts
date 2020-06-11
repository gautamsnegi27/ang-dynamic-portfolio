import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserDetailsValidators {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(" ") != -1)
            return { cannotContainSpace: "There should be no whitespace" };
        return null;
    }

    static passwordValidation(control: AbstractControl): ValidationErrors | null {
        const uppercase = new RegExp("(?=.*[A-Z])");
        const specialCharcaters = new RegExp("(?=.*[!@#\$%\^&\*])");
        const lowercase = new RegExp("(?=.*[a-z])");
        const minimum8char = new RegExp("(?=.{8,})");
        let modified = 0;

        let password = {
            uppercase: null,
            lowercase: null,
            specialCharcaters: null,
            minimum8char: null
        };


        if (uppercase.test(control.value as string)) {
            password.uppercase = true
            modified++
        }
        if (lowercase.test(control.value as string)) {
            password.lowercase = true
            modified++
        }
        if (specialCharcaters.test(control.value as string)) {
            password.specialCharcaters = true
            modified++
        } 
        if (minimum8char.test(control.value as string)) {
            password.minimum8char = true
            modified++
        } 
        return (modified < 4) ? { passwordValidation: password } : null

    }

    static passwordShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let repass = control.get('repass');
        if ((null != password || null != repass) && password.value !== repass.value)
            return { passwordShouldMatch: true };
        return null;
    };

}

