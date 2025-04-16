import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @HostBinding('class.mobile-menu-open') isMobileMenuOpen = false;
  userName: string = '';
  isAuthenticated = false;
  isDropdownOpen = false;
  cartCount = 0;
  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          // Get the current user's name from AuthService
          this.authService.getCurrentUser().subscribe(user => {
            if (user) {
              this.userName = user.displayName || 'User';

              // Get additional user data from Firestore
              this.authService.getUserData().subscribe(userData => {
                if (userData) {
                  if (userData.displayName) {
                    this.userName = userData.displayName;
                  }
                  // Check if user is admin from Firestore data
                  this.isAdmin = userData.role === 'admin';
                }
              });
            }
          });
        } else {
          this.userName = '';
          this.isAdmin = false;
        }
      }
    );

    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToDashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.closeMobileMenu();
  }
}
