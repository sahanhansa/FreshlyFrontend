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
import { DriverNavbarComponent } from "@app/components/driver/driver-navbar/driver-navbar.component";
import { FooterComponent } from '@app/components/shared/footer/footer.component'; // Assuming you have a footer component
import { ToastService } from '../../../services/driver/ToastService'

@Component({
  selector: 'app-edit-details-form',
  templateUrl: './edit-details-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DriverNavbarComponent, FooterComponent],
})
export class EditDetailsFormComponent implements OnInit {

  private baseUrl = `${environment.apiUrl}/api/Driver`;

  driverId: string = localStorage.getItem('userId') || '';

  error: string = '';

  accountForm: FormGroup;
  passwordForm: FormGroup;
  submittedAccount = false;
  submittedPassword = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  profilePhoto: string = '';
  constructor(private fb: FormBuilder, private http: HttpClient, private toastService: ToastService) {
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
        currentPassword: [''],
        password: [''],
        confirmPassword: ['']
      },
      { validators: this.passwordMatchValidator }
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
          profilePhoto: data.profilePhoto
        });

        // Set existing image as preview
        if (data.profilePhoto) {
          this.profilePhoto = data.profilePhoto;
        }
        
      },
      error: (err) => {
        console.error('Failed to load account details:', err);
      },
    });
  }


  onAccountSubmit() {
    this.submittedAccount = true;
    if (this.accountForm.valid) {
      const formData = new FormData();

      Object.keys(this.accountForm.controls).forEach((key) => {
        formData.append(key, this.accountForm.get(key)?.value);
      });

      formData.append('driverId', this.driverId);

      console.log('--- FormData Preview ---');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.http.patch(`${this.baseUrl}/update-profile`, formData).subscribe({
        next: (res) => console.log('Account updated:', res),
        error: (err) => console.error(err),
      });
       this.toastService.success('Saved!', 'Your changes have been saved.');
      alert('Account details updated successfully!');
      this.loadAccountDetails();
    } else {
      console.log('Account form invalid');
      alert("Account form invalid")
    }
  }

  updateImage() {
    if (!this.selectedImage) {
      console.warn('No image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedImage);
    formData.append('driverID', this.driverId);

    console.log('--- FormData Preview ---');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.http.patch(`${this.baseUrl}/update-profile`, formData).subscribe({
      next: (res) => console.log('Image updated:', res),
      error: (err) => console.error(err),
    });
    alert('Account details updated successfully!');
    this.loadAccountDetails();
  }


  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }


  onPasswordSubmit() {
    this.submittedPassword = true;

    const payload = {
      currentPassword: this.passwordForm.get('currentPassword')?.value,
      newPassword: this.passwordForm.get('password')?.value,
      driverId: this.driverId
    };

    console.log('Submitting password change:', payload);
    if (this.passwordForm.valid) {


      this.http.patch(`${this.baseUrl}/update-password`, payload).subscribe({
        next: (res) => {
          console.log('Password changed:', res);
          // Optional: Reset the form or show success
          this.passwordForm.reset();
          this.submittedPassword = false;
          this.error = ''; // clear error if any
        },
        error: (err) => {
          console.error('Error changing password:', err);
          if (err.status === 409) {
            this.error = 'Current password is wrong';
          } else {
            this.error = 'An unexpected error occurred. Please try again.';
          }
        }
      });

    } else {
      console.log('Password form invalid');
      this.error = 'password is mismatching';
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
