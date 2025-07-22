import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthHelperService } from '../../../services/auth-helper.service';

import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './lun-login.component.html',
  styleUrls: ['./lun-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf]
})
export class LunLoginComponent implements OnInit {
  successMessage: string = '';
  showSuccessPopup: boolean = false;
  errorMessage: string = '';
  showErrorPopup: boolean = false;
  loginForm: FormGroup;
  inputType: string = 'password';
  selectedRole: string = 'customer'; // Default role
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  goToReset() {
    this.router.navigate(['/request-reset'], { queryParams: { userType: 'Laundry' } });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login attempt:', { username, password });
       const loginData = { username, password };
      this.authService.laundryLogin(loginData).subscribe({
        next: (res: any) => {
          // Save token, username, userId to localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('laundryName', res.username);
          localStorage.setItem('laundryId', res.userId);
          localStorage.setItem('role', 'laundry');
          // Show success popup
          this.successMessage = 'Login successful! Redirecting...';
          this.showSuccessPopup = true;
          setTimeout(() => {
            this.showSuccessPopup = false;
            this.router.navigate(['/laundry-home']);
          }, 1500);
        },
        error: (err) => {
          // Show backend error message in popup
          let errorMsg = 'Login failed. Please check your credentials.';
          if (err && err.error) {
            if (typeof err.error === 'string') {
              errorMsg = err.error;
            } else if (err.error.error) {
              errorMsg = err.error.error;
            } else if (err.error.message) {
              errorMsg = err.error.message;
            }
          }
          this.errorMessage = errorMsg;
          this.showErrorPopup = true;
        }
      });
      // Add your authentication logic here
      // Example: this.authService.login(username, password)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';
  }

  testCustomerLogin(): void {
    this.loginForm.patchValue({
      username: 'customer@test.com',
      password: 'customer123'
    });
    this.onSubmit();
  }

  testAdminLogin(): void {
    this.loginForm.patchValue({
      username: 'admin@test.com',
      password: 'admin123'
    });
    this.onSubmit();
  }

  testLaundryLogin(): void {
    this.loginForm.patchValue({
      username: 'laundry@test.com',
      password: 'laundry123'
    });
    this.onSubmit();
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  forgotPassword(): void {
    // Navigate to forgot password or show modal
    console.log('Forgot password clicked');
  }
}