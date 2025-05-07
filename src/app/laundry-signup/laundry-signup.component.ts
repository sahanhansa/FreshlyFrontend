import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- ADD THIS

@Component({
  selector: 'app-laundry-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // <-- ADD CommonModule here
 templateUrl: './laundry-signup.component.html',
  styleUrl: './laundry-signup.component.css'
})
export class LaundrySignupComponent implements OnInit {
  
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  isAddressClicked = false;
  isOwnerClicked = false;



  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      contact1: ['', Validators.required],
      contact2: [''],
      laundryemail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      laundry: ['', Validators.required],
      owner: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      owneremail: ['', [Validators.required, Validators.email]],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
    } else {
      console.log('Form Not Valid');
      this.signupForm.markAllAsTouched();
    }
  }
  
}

