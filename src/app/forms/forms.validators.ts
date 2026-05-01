import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

export const confirmPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  return null; // placeholder
};

export function minAgeValidator(min: number): ValidatorFn {
  return (_control: AbstractControl): ValidationErrors | null => {
    return null; // placeholder
  };
}

export const emailInUseValidator: AsyncValidatorFn = (control: AbstractControl) => {
  return timer(1000).pipe(map(() => null)); // placeholder
};
