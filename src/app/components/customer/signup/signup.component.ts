import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitting = false;
  
  // Notification properties
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';
  notificationTitle = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const formData = this.signupForm.value;
      console.log('Form submitted with data:', formData);

      // Send to backend
      this.authService.customerRegister(formData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.showSuccessNotification('Account Created Successfully!', 'Welcome! Your account has been created. Redirecting to login...');
          this.signupForm.reset();
          
          // Navigate to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/cus-login']);
          }, 2000);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Signup error:', err.error.error );
          let errorMessage = `${err.error.error}, Account creation failed. Please try again.`;
          
          // Handle specific error messages from backend
          if (err.error?.Error) {
            errorMessage = err.error.Error;
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }
          
          this.showErrorNotification('Account Creation Failed', errorMessage);
          console.error('Signup error:', err);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.signupForm);
    }
  }

  private showSuccessNotification(title: string, message: string): void {
    this.notificationType = 'success';
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.showNotification = true;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }

  private showErrorNotification(title: string, message: string): void {
    this.notificationType = 'error';
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.showNotification = true;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }

  hideNotification(): void {
    this.showNotification = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to check if a field has a specific error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.signupForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors || !field.touched) {
      return '';
    }

    const errors = field.errors;
    if (errors['required']) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email address';
    }
    if (errors['minlength']) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['pattern']) {
      if (fieldName === 'postalCode') {
        return 'Please enter a valid postal code';
      }
      if (fieldName.includes('contactNumber')) {
        return 'Please enter a valid contact number';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'houseNo': 'House Number',
      'street': 'Street',
      'city': 'City',
      'postalCode': 'Postal Code',
      'email': 'Email',
      'contactNumber': 'Contact Number',
      'username': 'Username',
      'password': 'Password',
      'confirmPassword': 'Confirm Password'
    };
    return displayNames[fieldName] || fieldName;
  }
}