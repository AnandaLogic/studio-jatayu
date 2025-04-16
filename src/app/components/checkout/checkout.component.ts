import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService, CartItem } from '../../services/cart.service';

interface ShippingAddress {
  name: string;
  countryCode: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userCountryCode: string = '+91';
  userMobile: string = '';

  shippingAddress: ShippingAddress = {
    name: '',
    countryCode: '+91',
    mobile: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  };

  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shippingCost: number = 0;
  total: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserDetails();
    this.loadCartItems();
  }

  private loadUserDetails() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userName = user.displayName || '';
        this.userEmail = user.email || '';
        // Load additional user details from your user service/database
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  private loadCartItems() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.shippingCost = this.calculateShippingCost();
    this.total = this.subtotal + this.shippingCost;
  }

  private calculateShippingCost(): number {
    // Implement your shipping cost calculation logic here
    return 10; // Default shipping cost
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCartItems();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.loadCartItems();
    }
  }

  proceedToPayment() {
    // Validate shipping address
    if (!this.validateShippingAddress()) {
      alert('Please fill in all required shipping details');
      return;
    }

    // Create order object
    const order = {
      userDetails: {
        name: this.userName,
        email: this.userEmail,
        mobile: `${this.userCountryCode}${this.userMobile}`
      },
      shippingAddress: this.shippingAddress,
      items: this.cartItems,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total,
      status: 'pending',
      date: new Date()
    };

    // Process payment and create order
    // Implement your payment processing logic here
    console.log('Processing order:', order);
  }

  private validateShippingAddress(): boolean {
    return !!(
      this.shippingAddress.name &&
      this.shippingAddress.mobile &&
      this.shippingAddress.address &&
      this.shippingAddress.city &&
      this.shippingAddress.state &&
      this.shippingAddress.country &&
      this.shippingAddress.pincode
    );
  }
}
