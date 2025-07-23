import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-edit-details-form',
  templateUrl: './edit-details-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditDetailsFormComponent implements OnInit {

  private baseUrl = `${environment.apiUrl}/api/Driver`;
  
    driverId: string = localStorage.getItem('userId') || '';


  accountForm: FormGroup;
  passwordForm: FormGroup;
  submittedAccount = false;
  submittedPassword = false;

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.loadAccountDetails();
  }

  loadAccountDetails() {
    const url = `${this.baseUrl}/DriverEdit/${this.driverId}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log('Fetched account:', data);

        // Patch form controls
        this.accountForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          houseNo: data.houseNo,
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          email: data.email,
          contactNumber: data.contactNumber,
        });

        // Set existing image as preview
        if (data.profileImageUrl) {
          this.imagePreview = data.profileImageUrl;
        }
      },
      error: (err) => {
        console.error('Failed to load account details:', err);
      },
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onAccountSubmit() {
    this.submittedAccount = true;
    if (this.accountForm.valid) {
      const formData = new FormData();

      Object.keys(this.accountForm.controls).forEach((key) => {
        formData.append(key, this.accountForm.get(key)?.value);
      });

      if (this.selectedImage) {
        formData.append('profileImage', this.selectedImage);
      }

      console.log('--- FormData Preview ---');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.http.post('/api/account/update', formData).subscribe({
        next: (res) => console.log('Account updated:', res),
        error: (err) => console.error(err),
      });
    } else {
      console.log('Account form invalid');
    }
  }

  onPasswordSubmit() {
    this.submittedPassword = true;
    if (this.passwordForm.valid) {
      const payload = {
        newPassword: this.passwordForm.get('password')?.value,
      };

      this.http.post('/api/account/change-password', payload).subscribe({
        next: (res) => console.log('Password changed:', res),
        error: (err) => console.error(err),
      });
    } else {
      console.log('Password form invalid');
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  get f() {
    return this.accountForm.controls;
  }

  get pf() {
    return this.passwordForm.controls;
  }
}
