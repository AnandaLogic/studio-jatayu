import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (formGroup.get('confirmPassword')?.errors?.['passwordMismatch']) {
        const errors = { ...formGroup.get('confirmPassword')?.errors };
        delete errors['passwordMismatch'];
        formGroup.get('confirmPassword')?.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration form submitted', this.registerForm.value);
      this.router.navigate(['/login']);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getPlaceholder(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (!field || !field.touched) {
      switch (fieldName) {
        case 'fullName': return 'Full Name';
        case 'email': return 'Email Address';
        case 'password': return 'Password';
        case 'confirmPassword': return 'Confirm Password';
        case 'mobileNumber': return 'Mobile Number';
        default: return '';
      }
    }

    if (field.invalid) {
      if (fieldName === 'fullName' && field.errors?.['required']) {
        return 'Full name is required';
      }

      if (fieldName === 'email') {
        if (field.errors?.['required']) return 'Email is required';
        if (field.errors?.['email']) return 'Please enter a valid email address';
      }

      if (fieldName === 'password') {
        if (field.errors?.['required']) return 'Password is required';
        if (field.errors?.['minlength']) return 'Password must be at least 6 characters';
      }

      if (fieldName === 'confirmPassword') {
        if (field.errors?.['required']) return 'Confirm your password';
        if (field.errors?.['passwordMismatch']) return 'Passwords do not match';
      }

      if (fieldName === 'mobileNumber') {
        if (field.errors?.['required']) return 'Mobile number is required';
        if (field.errors?.['pattern']) return 'Enter a valid 10-digit mobile number';
      }
    }

    switch (fieldName) {
      case 'fullName': return 'Full Name';
      case 'email': return 'Email Address';
      case 'password': return 'Password';
      case 'confirmPassword': return 'Confirm Password';
      case 'mobileNumber': return 'Mobile Number';
      default: return '';
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
