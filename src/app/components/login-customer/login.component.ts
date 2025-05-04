import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const formData = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password
      }
      this.auth.login_async(formData).subscribe({
        next: (response) => {
          console.log('Data received:', response);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      })
    } else {
      console.log("Form is not valid..");
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid..");
    }
  }

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
}
