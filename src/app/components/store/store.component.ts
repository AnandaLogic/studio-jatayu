import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  products = [
    {
      id: 1,
      title: 'Academy of Gods',
      type: 'Comic Book',
      price: 399,
      image: 'aog-poster.png'
    },
    {
      id: 2,
      title: 'Academy of Gods',
      type: 'Comic Book',
      price: 399,
      image: 'aog-poster.png'
    },
    {
      id: 3,
      title: 'Academy of Gods',
      type: 'Comic Book',
      price: 399,
      image: 'aog-poster.png'
    },
    {
      id: 4,
      title: 'Academy of Gods',
      type: 'Comic Book',
      price: 399,
      image: 'aog-poster.png'
    },
    {
      id: 5,
      title: 'Academy of Gods',
      type: 'Comic Book',
      price: 399,
      image: 'aog-poster.png'
    }
  ];

  constructor(
    @Inject(CartService) private cartService: CartService,
    @Inject(AuthService) public authService: AuthService,
    @Inject(ToastService) private toastService: ToastService
  ) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.toastService.show('Item added to cart!', 'success');
  }
}
