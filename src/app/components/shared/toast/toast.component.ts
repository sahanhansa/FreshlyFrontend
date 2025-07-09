import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  
  constructor(private toastService: ToastService) {}
  
  ngOnInit(): void {
    this.toastService.toasts.subscribe(toast => {
      this.toasts.push(toast);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        this.remove(toast.id);
      }, 5000);
    });
  }
  
  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
