import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

togglePassword(): void {
  this.showPassword = !this.showPassword;
}


  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      if (this.rememberMe && isPlatformBrowser(this.platformId)) {
        localStorage.setItem('rememberedEmail', this.email);
      } else if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('rememberedEmail');
      }
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        this.email = rememberedEmail;
        this.rememberMe = true;
      }
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
