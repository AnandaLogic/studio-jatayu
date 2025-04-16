import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  isAuthenticated: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal();
    });

    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(item.id, quantity);
    }
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  checkout() {
    if (this.isAuthenticated) {
      // Navigate to checkout page
      this.router.navigate(['/checkout']);
    } else {
      // Navigate to login page if user is not authenticated
      this.router.navigate(['/login']);
    }
  }

  continueShopping() {
    // Navigate to store page
    this.router.navigate(['/store']);
  }
}
