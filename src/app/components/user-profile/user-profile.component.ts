import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { User } from 'firebase/auth';

interface UserData {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  role?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  loading = true;
  error: string | null = null;
  userData: UserData | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      })
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    this.loading = true;
    this.error = null;

    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        // Get user data from Firestore
        this.authService.getUserData().subscribe((userData: UserData | null) => {
          if (userData) {
            this.userData = userData;
            this.profileForm.patchValue({
              name: userData.name || '',
              email: user.email || '',
              countryCode: userData.countryCode || '+91',
              phone: userData.phone || '',
              address: {
                street: userData.address?.street || '',
                city: userData.address?.city || '',
                state: userData.address?.state || '',
                country: userData.address?.country || '',
                zipCode: userData.address?.zipCode || ''
              }
            });
            this.profileForm.disable();
          }
          this.loading = false;
        }, error => {
          console.error('Error loading user data:', error);
          this.error = 'Failed to load user data. Please try again later.';
          this.loading = false;
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get('email')?.disable();
  }

  cancelEditing() {
    this.isEditing = false;
    this.profileForm.disable();
    this.loadUserData(); // Reload the original data
  }

  async saveChanges() {
    if (this.profileForm.valid && this.profileForm.dirty) {
      this.loading = true;
      this.error = null;

      this.authService.getCurrentUser().subscribe(async (user: User | null) => {
        if (user) {
          try {
            const updatedData = {
              name: this.profileForm.get('name')?.value,
              countryCode: this.profileForm.get('countryCode')?.value,
              phone: this.profileForm.get('phone')?.value,
              address: this.profileForm.get('address')?.value
            };

            await this.firestoreService.updateDocument('users', user.uid, updatedData);
            this.isEditing = false;
            this.profileForm.disable();
            this.loading = false;
            this.loadUserData(); // Reload the updated data
          } catch (error) {
            console.error('Error updating user data:', error);
            this.error = 'Failed to update profile. Please try again later.';
            this.loading = false;
          }
        }
      });
    }
  }

  goToDashboard() {
    this.router.navigate(['/user-dashboard']);
  }
}
