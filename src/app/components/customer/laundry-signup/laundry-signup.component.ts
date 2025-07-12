import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laundry-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './laundry-signup.component.html',
  styleUrl: './laundry-signup.component.css'
})
export class LaundrySignupComponent implements OnInit {

  // Password field visibility controls
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  // Form group instance for sign-up form
  signupForm!: FormGroup;

  // Booleans to toggle UI section
  isAddressClicked = false;
  isOwnerClicked = false;

  // Injecting FormBuilder for creating form controls
  constructor(private fb: FormBuilder) {}

// Initialize form group with form controls and validators
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      houseNumber: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\/\-\.\s]+$/)// Allows letters, numbers, slashes, dots, hyphens, and space
      ]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{5}$/)// Must be exactly 10 digits
      ]],
      contact1: ['', [Validators.required, 
        Validators.pattern(/^\d{10}$/)]],// 10-digit number
      contact2: ['', [Validators.pattern(/^\d{10}$/)]],// Optional second contact number
      laundryemail: ['', [Validators.required, Validators.email]], // Must be a valid email
      password: ['', [

         // Password must contain uppercase, lowercase, number, special character, and be at least 8 characters
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      repassword: ['', Validators.required],
      laundry: ['', Validators.required],
      owner: ['', Validators.required],// Owner's name
      firstname: ['', Validators.required],// Owner's first name
      lastname: ['', Validators.required], // Owner's last name
      owneremail: ['', [Validators.required, Validators.email]]
    },
    // Custom validator to match password fields
    { validators: this.passwordMatchValidator });
  }

  // Only allow numeric input
  allowOnlyDigits(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Password match validator
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const repass = group.get('repassword')?.value;
    return pass === repass ? null : { passwordMismatch: true };
  }

  // Toggle password visibility
  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  // Submit the form
  onSignup() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value); // Log form data if valid
    } else {
      console.log('Form Not Valid');// Notify if form is invalid
      this.signupForm.markAllAsTouched();// Trigger validation messages
    }
  }
   
}
