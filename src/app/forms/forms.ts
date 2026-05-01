import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator, emailInUseValidator, minAgeValidator } from './forms.validators';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms {
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [emailInUseValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      age: [null, [Validators.required, minAgeValidator(18), Validators.max(128)]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    },
    { validators: [confirmPasswordValidator] },
  );

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(`Enviado jeje :D, ${JSON.stringify(this.formGroup.value)}`);
      this.formGroup.reset();
    }
  }
}
