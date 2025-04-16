import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  orders: any[] = [];
  adminName: string = 'Admin';
  newAdminEmail: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.adminName = user.displayName || 'Admin';
        // Fetch orders for all users
        this.fetchAllOrders();
      }
    });
  }

  fetchAllOrders() {
    // This will be implemented later to fetch orders from Firebase
    this.orders = [];
  }

  addAdmin() {
    if (this.newAdminEmail) {
      this.authService.addAdminRole(this.newAdminEmail).then(() => {
        console.log(`Added admin role to ${this.newAdminEmail}`);
        this.newAdminEmail = '';
      }).catch((error: Error) => {
        console.error('Error adding admin role:', error);
      });
    }
  }
}
