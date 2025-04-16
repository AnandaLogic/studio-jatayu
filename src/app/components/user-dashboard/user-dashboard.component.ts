import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  orders: any[] = [];
  userName: string = 'User';
  userEmail: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userName = user.displayName || 'User';
        this.userEmail = user.email || '';

        // Fetch user data from Firestore
        this.authService.getUserData().subscribe(userData => {
          if (userData && userData.displayName) {
            this.userName = userData.displayName;
          }

          // Fetch orders for the current user
          this.fetchUserOrders(user.uid);
        });
      } else {
        // Redirect to login if not authenticated
        this.router.navigate(['/login']);
      }
    });
  }

  fetchUserOrders(userId: string) {
    this.loading = true;
    this.error = null;

    this.firestoreService.getUserOrders(userId)
      .then(orders => {
        this.orders = orders;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        this.error = 'Failed to load orders. Please try again later.';
        this.loading = false;
      });
  }

  goToStore() {
    this.router.navigate(['/store']);
  }
}
