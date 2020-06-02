import { AbstractControl, ValidationErrors } from '@angular/forms';
import { resolve } from 'url';

export class PasswordMatchValidator {
    // static validOldPassword(control: AbstractControl) {
    //     return new Promise((resolve) => {
    //         if (control.value !== '1234')
    //             resolve({ invalidOldPassword: true });
    //         else
    //             resolve(null);
    //     });
    // }

    static passwordShouldMatch(control: AbstractControl ) {
        let newPass = control.get('password');
        let reenteredPass = control.get('repass');
        if ((null!=newPass&&null!=reenteredPass) && 
            newPass.value !== reenteredPass.value)
            debugger
            return { passwordShouldMatch: true };
        return null;
    };
}