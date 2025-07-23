import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../../services/password-reset.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-reset',
  templateUrl: './verify-reset.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf, RouterModule, TitleCasePipe]
})
export class VerifyResetComponent implements OnInit, OnDestroy {
  verifyForm: FormGroup;
  email = '';
  userType = '';
  message = '';
  error = '';
  isLoading = false;
  isResending = false;
  showPassword = false;
  resendCooldown = 0;
  
  private resendTimer?: Subscription;

  constructor(
    private resetService: PasswordResetService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.userType = params['userType'] || '';
      
      // If no email provided, redirect back
      if (!this.email) {
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  ngOnDestroy() {
    if (this.resendTimer) {
      this.resendTimer.unsubscribe();
    }
  }

  verifyReset() {
    if (this.verifyForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Clear previous messages
    this.message = '';
    this.error = '';
    this.isLoading = true;

    const { code, newPassword } = this.verifyForm.value;

    this.resetService.verifyReset(this.email, code, newPassword, this.userType).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = res.message || 'Password reset successful!';
        
        // Determine login route based on user type
        // const loginRoute = this.getLoginRoute();
        
        // Show success message for 3 seconds before redirecting
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.error || err.error?.message || 'Invalid code or error occurred. Please try again.';
        
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    });
  }

  resendCode() {
    if (this.resendCooldown > 0 || this.isResending) {
      return;
    }

    this.isResending = true;
    this.error = '';
    this.message = '';

    this.resetService.requestReset(this.email, this.userType).subscribe({
      next: (res) => {
        this.isResending = false;
        this.message = 'Verification code resent successfully!';
        this.startResendCooldown();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (err) => {
        this.isResending = false;
        this.error = err.error?.error || 'Failed to resend code. Please try again.';
      }
    });
  }

  private startResendCooldown() {
    this.resendCooldown = 60; // 60 second cooldown
    this.resendTimer = interval(1000).subscribe(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        this.resendTimer?.unsubscribe();
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCodeInput(event: any) {
    // Only allow numeric input for code
    const value = event.target.value.replace(/\D/g, '');
    this.verifyForm.patchValue({ code: value });
  }

  getPasswordStrength(): string {
    const password = this.verifyForm.get('newPassword')?.value || '';
    if (password.length < 6) return 'weak';
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const strengthScore = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
    
    if (strengthScore >= 4) return 'strong';
    if (strengthScore >= 2) return 'medium';
    return 'weak';
  }

  getPasswordStrengthWidth(): number {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 'weak': return 25;
      case 'medium': return 60;
      case 'strong': return 100;
      default: return 0;
    }
  }

  goBack() {
    this.router.navigate(['/forgot-password'], { 
      queryParams: { userType: this.userType } 
    });
  }

  private getLoginRoute(): string {
    switch (this.userType) {
      case 'Customer':
        return '/customer/login';
      case 'Driver':
        return '/driver/login';
      case 'Laundry':
        return '/laundry/login';
      case 'Admin':
        return '/admin/login';
      default:
        return '/login';
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.verifyForm.controls).forEach(key => {
      const control = this.verifyForm.get(key);
      control?.markAsTouched();
    });
  }
}