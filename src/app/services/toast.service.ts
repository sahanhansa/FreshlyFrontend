import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new Subject<Toast>();
  public toasts = this.toasts$.asObservable();
  private id = 0;
  
  show(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.toasts$.next({
      id: ++this.id,
      title,
      message,
      type
    });
  }
}