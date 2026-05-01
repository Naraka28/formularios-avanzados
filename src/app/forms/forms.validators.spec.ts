import { firstValueFrom, Observable } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { confirmPasswordValidator, emailInUseValidator, minAgeValidator } from './forms.validators';

describe('confirmPasswordValidator', () => {
  it('returns null when passwords match', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirmPassword: new FormControl('secret123'),
    });
    expect(confirmPasswordValidator(group)).toBeNull();
  });

  it('returns passwordMismatch when passwords differ', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirmPassword: new FormControl('different'),
    });
    expect(confirmPasswordValidator(group)).toEqual({ passwordMismatch: true });
  });
});

describe('minAgeValidator', () => {
  it('returns null when age equals minimum', () => {
    const control = new FormControl(18);
    expect(minAgeValidator(18)(control)).toBeNull();
  });

  it('returns null when age exceeds minimum', () => {
    const control = new FormControl(25);
    expect(minAgeValidator(18)(control)).toBeNull();
  });

  it('returns minAge error when age is below minimum', () => {
    const control = new FormControl(17);
    expect(minAgeValidator(18)(control)).toEqual({ minAge: { required: 18, actual: 17 } });
  });

  it('returns minAge error when age is 0', () => {
    const control = new FormControl(0);
    expect(minAgeValidator(18)(control)).toEqual({ minAge: { required: 18, actual: 0 } });
  });
});

describe('emailInUseValidator', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns emailInUse error for the taken email', async () => {
    const control = new FormControl('dan@gmail.com');
    const promise = firstValueFrom(
      emailInUseValidator(control) as Observable<ValidationErrors | null>
    );
    vi.runAllTimers();
    const result = await promise;
    expect(result).toEqual({ emailInUse: true });
  });

  it('returns null for a free email', async () => {
    const control = new FormControl('free@example.com');
    const promise = firstValueFrom(
      emailInUseValidator(control) as Observable<ValidationErrors | null>
    );
    vi.runAllTimers();
    const result = await promise;
    expect(result).toBeNull();
  });
});
