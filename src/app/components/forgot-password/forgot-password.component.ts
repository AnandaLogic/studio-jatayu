import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  showOtpInput: boolean = false;
  errorMessage: string = '';
  isVerifying: boolean = false;

  constructor(private router: Router) {}

  onSubmitEmail() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    // In a real app, you would send this to your backend
    // For development, we'll simulate sending an OTP
    this.showOtpInput = true;
    this.errorMessage = '';
  }

  verifyOtp() {
    if (!this.otp || this.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit OTP';
      return;
    }

    this.isVerifying = true;

    // Simulate OTP verification
    setTimeout(() => {
      this.isVerifying = false;
      // In a real app, you would verify the OTP with your backend
      // For development, we'll just redirect to login
      this.router.navigate(['/login']);
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
