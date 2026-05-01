import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

export const confirmPasswordValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

export function minAgeValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value >= min ? null : { minAge: { required: min, actual: value } };
  };
}

export const emailInUseValidator: AsyncValidatorFn = (control: AbstractControl) => {
  const takenEmail = 'dan@gmail.com';
  return timer(1000).pipe(map(() => (control.value === takenEmail ? { emailInUse: true } : null)));
};
