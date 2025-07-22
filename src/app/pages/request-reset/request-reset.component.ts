import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../../services/password-reset.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf, RouterModule]
})
export class RequestResetComponent {
  resetForm: FormGroup;
  message = '';
  error = '';
  isLoading = false;
  userType = '';

  constructor(
    private resetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'] || '';
    });
  }

  requestReset() {
    if (this.resetForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Clear previous messages
    this.message = '';
    this.error = '';
    this.isLoading = true;

    const { email } = this.resetForm.value;

    this.resetService.requestReset(email, this.userType).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = res.message || 'Reset code sent successfully!';
        
        // Show success message for 2 seconds before redirecting
        setTimeout(() => {
          this.router.navigate(['/verify-reset'], { 
            queryParams: { email, userType: this.userType } 
          });
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.error || err.error?.message || 'Something went wrong. Please try again.';
        
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.resetForm.controls).forEach(key => {
      const control = this.resetForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to check if email field has specific error
  hasEmailError(errorType: string): boolean {
    const emailControl = this.resetForm.get('email');
    return emailControl?.hasError(errorType) && emailControl?.touched || false;
  }
}