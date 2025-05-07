import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router'; // 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
    role: ''
  };
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  inputType: string = 'password';
  loginForm!: FormGroup; 


  constructor(
    private fb: FormBuilder,
    private router: Router,
     private auth: AuthService,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.route.queryParams.subscribe(params => {
    //   this.loginData.role = params['role'] || ''; // get role from URL
    //   console.log('Selected role:', this.loginData.role);
      
    // });
    
  }

  
  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
    this.inputType = this.isText ? 'text' : 'password';
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password,
        Role: localStorage.getItem("Role")
      };

      this.auth.login_async(formData).subscribe({
        next: (response: any) => {
          console.log('Data received:', response);
          const role = response?.result.role
          // Navigate based on role
          if (role === 'Customer') {
            this.router.navigate(['/cus-home']);
          } else if (role === 'Laundry') {
            this.router.navigate(['/laundry-home']);
          } else if (role === 'Admin') {
            this.router.navigate(['/admin-home']);
          }
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });

    } else {
      console.log("Form is not valid.");
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid.");
    }
    
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
  goToSignup() {
    const role = localStorage.getItem("Role");
    if (role === 'customer') {
      this.router.navigate(['/signup']);
    } else if (role === 'laundry') {
      this.router.navigate(['/laundry-signup']);
    } 
    else {
      alert('Please select your role first.');
      this.router.navigate(['/whoareyou']);
    }
  }
  
}
 
   
    
