import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';

interface UserData {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  role?: string;
}

@Component({
  selector: 'app-user-profile-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-profile-dropdown.component.html',
  styleUrls: ['./user-profile-dropdown.component.css']
})
export class UserProfileDropdownComponent implements OnInit {
  isOpen = false;
  isEditing = false;
  userName = '';
  profileForm: FormGroup;
  private userSubscription: Subscription | null = null;
  private originalFormValues: any;
  isAdmin = false;
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.authService.isAdmin().subscribe(isAdmin => {
          this.isAdmin = isAdmin;
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  private loadUserData() {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        // Get user data from Firestore
        this.authService.getUserData().subscribe((userData: UserData | null) => {
          if (userData) {
            this.userName = userData.name || 'User';
            this.profileForm.patchValue({
              name: userData.name || '',
              email: user.email || '',
              countryCode: userData.countryCode || '+91',
              phone: userData.phone || ''
            });
            this.originalFormValues = this.profileForm.value;

            // Check if user is admin
            if (userData.role === 'admin') {
              this.isAdmin = true;
            }
          }
        });
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.cancelEditing();
    }
  }

  startEditing() {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get('email')?.disable();
  }

  cancelEditing() {
    this.isEditing = false;
    this.profileForm.disable();
    this.profileForm.patchValue(this.originalFormValues);
  }

  async saveChanges() {
    if (this.profileForm.valid && this.profileForm.dirty) {
      this.authService.getCurrentUser().subscribe(async (user: User | null) => {
        if (user) {
          try {
            const updatedData = {
              name: this.profileForm.get('name')?.value,
              countryCode: this.profileForm.get('countryCode')?.value,
              phone: this.profileForm.get('phone')?.value
            };

            // Update user data in Firestore using FirestoreService
            await this.firestoreService.updateDocument('users', user.uid, updatedData);
            this.userName = updatedData.name;
            this.isEditing = false;
            this.profileForm.disable();
            this.profileForm.get('email')?.disable();
            this.originalFormValues = this.profileForm.value;
          } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error (show error message to user)
          }
        }
      });
    }
  }

  goToProfile(event: MouseEvent) {
    event.stopPropagation(); // Prevent dropdown from toggling
    this.router.navigate(['/profile']);
  }

  goToDashboard() {
    this.isOpen = false;
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }

  logout() {
    this.isOpen = false;
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
