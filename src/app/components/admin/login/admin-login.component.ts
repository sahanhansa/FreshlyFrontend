import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AuthHelperService } from '../../../services/auth-helper.service';

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
    private authService: AuthService,
    private authHelper: AuthHelperService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    // Component initialization logic
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loginData = { username, password };
      this.authService.adminLogin(loginData).subscribe({
        next: (res: any) => {
          // Store admin login data and clear any other user data
          this.authHelper.storeAdminLogin(res.token, res.username, res.userId);
          // Redirect to admin dashboard
          this.router.navigate(['/admin/dashboard']);
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