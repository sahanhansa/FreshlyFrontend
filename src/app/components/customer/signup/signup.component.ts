import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {FooterComponent} from '../../shared/footer/footer.component';
import {HeaderComponent} from '../../landing-page/header.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule,FooterComponent,HeaderComponent]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitting = false;

  // Profile image file
  profileImageFile: File | null = null;

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
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]],
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

  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImageFile = input.files[0];
    } else {
      this.profileImageFile = null;
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();
      Object.entries(this.signupForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (this.profileImageFile) {
        formData.append('ProfileImage', this.profileImageFile);
      }
      this.authService.customerRegister(formData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.showSuccessNotification('Account Created Successfully!', 'Welcome! Your account has been created. Redirecting to login...');
          this.signupForm.reset();
          this.profileImageFile = null;
          setTimeout(() => {
            this.router.navigate(['/cus-login']);
          }, 2000);
        },
        error: (err) => {
          console.log(err);
          this.isSubmitting = false;
          let errorMessage = `${err.error.error}, Account creation failed. Please try again.`;
          if (err.error?.Error) {
            errorMessage = err.error.Error;
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }
          this.showErrorNotification('Account Creation Failed', errorMessage);
        }
      });
    } else {
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