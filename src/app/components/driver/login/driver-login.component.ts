import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf]
})
export class DriverLoginComponent implements OnInit {
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

  ngOnInit(): void {
    // Component initialization logic
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login attempt:', { username, password });
      const loginData = { username, password };
      this.authService.driverLogin(loginData).subscribe({
        next: (res: any) => {
          // Save token, username, userId to localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.userId);
          // Redirect to customer home
          this.router.navigate(['/driver-home-page']);
        },
        error: (err) => {
          // Handle error (show message, etc.)
          alert('Login failed. Please check your credentials.');
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