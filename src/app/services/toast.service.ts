import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messages = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messages.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const toastMessage: ToastMessage = { message, type, duration };
    const currentMessages = this.messages.value;
    this.messages.next([...currentMessages, toastMessage]);

    setTimeout(() => {
      this.removeMessage(toastMessage);
    }, duration);
  }

  private removeMessage(messageToRemove: ToastMessage) {
    const currentMessages = this.messages.value;
    this.messages.next(currentMessages.filter(msg => msg !== messageToRemove));
  }
}
