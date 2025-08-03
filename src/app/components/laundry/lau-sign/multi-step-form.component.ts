import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LaundryRegistrationService, LaundryRegistrationRequest } from '../../../services/laundry-registration.service';
import {FooterComponent} from '../../shared/footer/footer.component';
import {HeaderComponent} from '../../landing-page/header.component';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FooterComponent,HeaderComponent]
})
export class MultiStepFormComponent implements OnInit {
  accountStateMessage: string = '';
  laundryId: string = '';
  ownerId: string = '';
  isLoading = false;
  registrationForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;

  constructor(private fb: FormBuilder, private laundryRegistrationService: LaundryRegistrationService) {
    this.registrationForm = this.fb.group({
      // Step 1: Laundry Details
      laundryName: ['', [Validators.required, Validators.minLength(2)]],
      laundryLogo: '',
      streetNumber: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber1: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      contactNumber2: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]],

      // Step 2: Owner Details
      ownerName: ['', [Validators.required, Validators.minLength(2)]],
      ownerAddress: ['', [Validators.required]],
      ownerContact: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      ownerEmail: ['', [Validators.required, Validators.email]],

      // Step 3: Create Account
      username: ['', [Validators.required, Validators.minLength(3)]],
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Initialize component
  }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  // Check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get required fields for current step
  getStepFields(): string[] {
    switch (this.currentStep) {
      case 1:
        return ['laundryName', 'streetNumber', 'street', 'city', 'postalCode', 'email', 'contactNumber1'];
      case 2:
        return ['ownerName', 'ownerAddress', 'ownerContact', 'ownerEmail'];
      case 3:
        return ['username', 'displayName', 'password', 'confirmPassword'];
      default:
        return [];
    }
  }
  profileImageFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.profileImageFile);
    }
  }


  // Check if current step is valid
  isStepValid(): boolean {
    const stepFields = this.getStepFields();

    for (const fieldName of stepFields) {
      const field = this.registrationForm.get(fieldName);
      if (!field || field.invalid) {
        return false;
      }
    }

    // Additional validation for step 3 (password match)
    if (this.currentStep === 3) {
      const password = this.registrationForm.get('password');
      const confirmPassword = this.registrationForm.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return false;
      }
    }

    return true;
  }

  // Mark step fields as touched to show validation errors
  markStepFieldsAsTouched(): void {
    const stepFields = this.getStepFields();

    stepFields.forEach(fieldName => {
      const field = this.registrationForm.get(fieldName);
      if (field) {
        field.markAsTouched();
      }
    });
  }

  // Navigate to next step
  nextStep(): void {
    if (this.isStepValid() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      this.markStepFieldsAsTouched();
    }
  }

  // Navigate to previous step
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Submit form
  submitForm(): void {
    if (this.isStepValid()) {
      this.currentStep = 4;
      const formData = new FormData();
      formData.append('laundryName', this.registrationForm.value.laundryName);
      formData.append('streetNumber', this.registrationForm.value.streetNumber);
      formData.append('street', this.registrationForm.value.street);
      formData.append('city', this.registrationForm.value.city);
      formData.append('postalCode', this.registrationForm.value.postalCode);
      formData.append('email', this.registrationForm.value.email);
      formData.append('contactNumber1', this.registrationForm.value.contactNumber1);
      formData.append('contactNumber2', this.registrationForm.value.contactNumber2 || '');
      formData.append('ownerName', this.registrationForm.value.ownerName);
      formData.append('ownerAddress', this.registrationForm.value.ownerAddress);
      formData.append('ownerContact', this.registrationForm.value.ownerContact);
      formData.append('ownerEmail', this.registrationForm.value.ownerEmail);
      formData.append('username', this.registrationForm.value.username);
      formData.append('displayName', this.registrationForm.value.displayName);
      formData.append('password', this.registrationForm.value.password);

      // Add image file if selected
      if (this.profileImageFile) {
        formData.append('ProfileImage', this.profileImageFile);
      }


      console.log('Submitting registration data:', formData);
      this.isLoading = true;
      this.laundryRegistrationService.registerLaundry(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Registration successful:', response);
          this.accountStateMessage = response.message || '';
          this.laundryId = response.laundryId || '';
          this.ownerId = response.ownerId || '';
        },
        error: (err) => {
          this.isLoading = false;
          let errorMsg = 'Registration failed. Please try again.';
          if (err && err.error) {
            if (typeof err.error === 'string') {
              errorMsg = err.error;
            } else if (err.error.error) {
              errorMsg = err.error.error;
            } else if (err.error.message) {
              errorMsg = err.error.message;
            }
          }
          this.accountStateMessage = errorMsg;
          console.error('Registration failed:', err);
        }
      });
    } else {
      this.markStepFieldsAsTouched();
    }
  }

  // Handle form submission (called by Angular form)
  onSubmit(): void {
    // This method is called when the form is submitted
    // The actual submission logic is handled by submitForm()
  }

  // Handle done button click
  done(): void {
    // Reset form or navigate to another page
    this.registrationForm.reset();
    this.currentStep = 1;
    console.log('Registration process completed');

    // You might want to emit an event or navigate to another route
    // this.router.navigate(['/dashboard']);
  }

  // Get form control for template access
  getFormControl(fieldName: string) {
    return this.registrationForm.get(fieldName);
  }

  // Get error message for a field
  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);

    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        return `${fieldName} format is invalid`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }

    return '';
  }
}