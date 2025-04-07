import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let message of messages$ | async"
           [class]="'toast ' + message.type">
        {{ message.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .toast {
      padding: 12px 24px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: white;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease-out;
      animation: slideIn 0.3s ease-out forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .success {
      background-color: #4CAF50;
    }

    .error {
      background-color: #f44336;
    }

    .info {
      background-color: #2196F3;
    }
  `]
})
export class ToastComponent implements OnInit {
  messages$: Observable<any>;

  constructor(@Inject(ToastService) private toastService: ToastService) {
    this.messages$ = this.toastService.messages$;
  }

  ngOnInit() {
    // Initialize messages$ here if needed
  }
}
