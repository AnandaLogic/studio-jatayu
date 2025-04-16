import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
      countryCode: ['+91', [Validators.required]],
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

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    try {
      // Implement email/password registration
      // This will be implemented later
      this.router.navigate(['/login']);
    } catch (error) {
      this.error = 'Registration failed';
      console.error('Registration error:', error);
    }
  }

  async registerWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/user-dashboard']);
    } catch (error) {
      this.error = 'Google registration failed';
      console.error('Google registration error:', error);
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
