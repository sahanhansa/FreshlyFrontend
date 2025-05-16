import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router'; // 



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Object to store login input data 
  loginData = {
    username: '',
    password: '',
    role: ''
  };


  // Password visibility toggle variables
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  inputType: string = 'password';

  // Login form declaration
  loginForm!: FormGroup;

  // Constructor injects services for form building, navigation, and authentication
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  // Initialize form controls with validators
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // Toggle password visibility
  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.inputType = this.isText ? 'text' : 'password';
  }


  // Validate all fields
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // Handle login form submission
  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const formData = {
  //       Username: this.loginForm.value.username,
  //       Password: this.loginForm.value.password,
  //       Role: localStorage.getItem("Role")
  //     };

  //Call AuthService
  //    loginObservable.subscribe({
  // next: (response: any) => {
  //   console.log('Data received:', response);


  // Navigate to the correct dashboard based on role
  //   if (formData.Role === 'customer') {
  //     this.router.navigate(['/cus-home']);
  //   } else if (formData.Role === 'laundry') {
  //     this.router.navigate(['/laundry-home']);
  //   } else if (formData.Role === 'admin') {
  //     this.router.navigate(['/admin-home']);
  //   } else {
  //     alert("Invalid role.");
  //   }
  //  },
  //  error: (err) => {
  //     console.error('Login failed:', err);
  //     alert("Login failed. Please check credentials.");
  //    },
  //  });

  //    } else {
  //    console.log("Form is not valid.");
  //      this.validateAllFormFields(this.loginForm);
  //     alert("Your form is invalid.");
  //  }
  //  }

  // Navigate to the correct signup page based on stored role
  //   goToSignup() {
  //     const role = localStorage.getItem("Role");
  //     if (role === 'customer') {
  //       this.router.navigate(['/signup']);
  //     } else if (role === 'laundry') {
  //       this.router.navigate(['/laundry-signup']);
  //     } 
  //     else {
  //       alert('Please select your role first.');
  //       this.router.navigate(['/whoareyou']);
  //     }
  //}

  // }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password
      };

      console.log('Form Data:', formData);

      // let loginObservable;

      switch (localStorage.getItem("Role")) {
        case 'customer':
          this.auth.customerLogin(formData).subscribe({
            next: (response: any) => {
              this.router.navigate(['/cus-home']);
            },
            error: (err) => { 
              alert(err.Data.Error);
            }
          });
          break;
        case 'laundry':
          this.auth.laundryLogin(formData).subscribe({
            next: (response: any) => {
              this.router.navigate(['/laundry']);
            },
            error: (err) => { }
          });
          break;
        default:
          alert("Invalid role. Please select your role.");
          this.router.navigate(['/whoareyou']);
          return;
      }

      // Decide which service method to call based on role
      // switch (formData.Role) {
      //   case 'customer':
      //     loginObservable = this.auth.customerLogin(formData);
      //     break;
      //   case 'laundry':
      //     loginObservable = this.auth.laundryLogin(formData);
      //     break;
      //   case 'admin':
      //     loginObservable = this.auth.adminLogin(formData);
      //     break;
      //   // case 'driver':
      //   //   loginObservable = this.auth.driverLogin(formData);
      //   //   break;
      //   default:
      //     alert("Invalid role. Please select your role.");
      //     this.router.navigate(['/whoareyou']);
      //     return;
      // }

      //Call the appropriate login method
      // loginObservable.subscribe({
      //   next: (response: any) => {
      //     console.log('Data received(login:158):', response);
      //     // Navigate to the correct dashboard
      //     if (formData.Role === 'customer') {
      //       this.router.navigate(['/cus-home']);
      //     } else if (formData.Role === 'laundry') {
      //       this.router.navigate(['/laundry-home']);
      //     } else if (formData.Role === 'admin') {
      //       this.router.navigate(['/admin-home']);
      //     } 
      // else if (formData.Role === 'driver') {
      //   this.router.navigate(['/driver-home']);
      //  }
      // },
      //     error: (err) => {
      //       console.error('Login failed:', err);
      //       alert("Login failed. Please check credentials.");
      //     }
      //   });

      // } else {
      //   console.log("Form is not valid.");
      //   this.validateAllFormFields(this.loginForm);
      //   alert("Your form is invalid.");
      // }
    }
  }
}
