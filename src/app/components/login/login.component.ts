import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log('User is already authenticated, redirecting to dashboard');
        this.router.navigate(['/user-dashboard']);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.router.navigate(['/user-dashboard']);
    } catch (error: any) {
      this.error = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      console.log('Initiating Google login...');
      await this.authService.loginWithGoogle();
      // Navigation is now handled in the AuthService
      console.log('Google login successful, navigation should occur automatically');
    } catch (error: any) {
      console.error('Google login error in component:', error);
      this.error = error.message || 'Failed to login with Google. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(error: any): string {
    if (error.message) {
      return error.message;
    }

    switch (error.code) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Google login was cancelled.';
      case 'auth/popup-blocked':
        return 'Please allow popups for this website to login with Google.';
      case 'auth/cancelled-popup-request':
        return 'Login was cancelled. Please try again.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  }

  navigateToRegister(): void {
    // Navigation is handled by the routerLink in the template
  }

  navigateToForgotPassword(): void {
    // Navigation is handled by the routerLink in the template
  }
}
