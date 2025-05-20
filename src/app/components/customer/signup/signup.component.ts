import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Adjust path if needed


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
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // <-- ADD CommonModule here
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Fields to manage password visibility toggle
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  // Reactive form group
  signupForm!: FormGroup;

  // Flags for toggling UI parts
  isAddressClicked = false;
  isOwnerClicked = false;

  // Inject form builder, router, and auth service
  constructor(private fb: FormBuilder,
    private router: Router, 
    private auth: AuthService 
  ) {}

  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      HouseNumber: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\/\-\.\s]+$/)// Allows alphanumeric and symbols / - . space
      ]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{5}$/)// Only allows exactly 10 digits


      ]],
      contact1: ['', [Validators.required,
         Validators.pattern(/^\d{10}$/)]],// Must be 10 digits
      contact2: ['',
         [Validators.pattern(/^\d{10}$/)]], // Optional 10-digit number
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)// Strong password rule

      ]],
      repassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, { validators: this.passwordMatchValidator }); // Attach custom validator for password match
  }

  // Only allow numeric input
  allowOnlyDigits(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();// Block non-digit input
    }
  }

 // Custom validator to check if password and re-entered password match
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

    // Handle signup form submission
  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Submitting signup form:', formData);

       // Call AuthService to handle signup logic (usually connects to backend)
      this.auth.signup_async(formData).subscribe({
        next: (response:any) => {
          console.log('Signup successful:', response);
          alert('Signup successful! Please login.');
          this.router.navigate(['/login']);// Redirect to login page
        },
        error: (err:any) => {
          console.error('Signup error:', err);
          alert('Signup failed. Please check your details or try again later.');
        }
      });

    } else {
      console.log('Form Not Valid');
      this.signupForm.markAllAsTouched();// Highlight all invalid fields
    }
  }
}
