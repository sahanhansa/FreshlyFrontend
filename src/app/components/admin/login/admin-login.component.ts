import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgClass, NgIf]
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  inputType: string = 'password';
  selectedRole: string = 'admin'; // Default role for admin
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
      const loginData = { username, password };
      this.authService.adminLogin(loginData).subscribe({
        next: (res: any) => {
          // Save token, username, userId to localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('adminUsername', res.username);
          localStorage.setItem('adminId', res.userId);
          // Redirect to admin dashboard
          this.router.navigate(['/admin-home']);
        },
        error: (err) => {
          // Handle error (show message, etc.)
          alert('Login failed. Please check your credentials.');
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}