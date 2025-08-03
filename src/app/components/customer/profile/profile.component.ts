import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';


interface ProfileUpdateRequest {
  customerId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  houseNo: string;
  street: string;
  city: string;
  postalCode: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  // Display properties
  name: string = '';
  email: string = '';
  contactNumbers: string[] = [];
  address: string = '';
  image:string = '';

  // Edit mode properties
  isEditing: boolean = false;
  isLoading: boolean = false;
  isDeleting: boolean = false;
  showDeleteConfirmation: boolean = false;
  editForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  // Original values for cancel functionality
  private originalValues: any = {};

  @Output() viewCurrentOrders = new EventEmitter<void>();
  @Output() viewOrderHistory = new EventEmitter<void>();
  @Output() editProfile = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Initialize the edit form
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      houseNo: [''],
      street: [''],
      city: [''],
      postalCode: ['']

    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  private loadProfileData(): void {
    // Load data from localStorage
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    this.name = firstName + (lastName ? ' ' + lastName : '');
    this.email = localStorage.getItem('email') || '';
    this.image = localStorage.getItem('profileImage') || '';
    
    // Handle contact numbers
    const contactNumbersRaw = localStorage.getItem('contactNumbers');
    if (contactNumbersRaw) {
      try {
        const parsed = JSON.parse(contactNumbersRaw);
        if (Array.isArray(parsed)) {
          this.contactNumbers = parsed;
        } else if (typeof parsed === 'string') {
          this.contactNumbers = [parsed];
        } else {
          this.contactNumbers = [contactNumbersRaw];
        }
      } catch {
        this.contactNumbers = [contactNumbersRaw];
      }
    } else {
      const contactNumber = localStorage.getItem('contactNumber');
      if (contactNumber) {
        this.contactNumbers = [contactNumber];
      }
    }

    // Build address
    const houseNo = localStorage.getItem('houseNo') || '';
    const street = localStorage.getItem('street') || '';
    const city = localStorage.getItem('city') || '';
    const postalCode = localStorage.getItem('postalCode') || '';
    this.address = [houseNo, street, city, postalCode].filter(Boolean).join(', ');

    // Store original values
    this.originalValues = {
      firstName: firstName,
      lastName: lastName,
      email: this.email,
      houseNo: houseNo,
      street: street,
      city: city,
      postalCode: postalCode
    };
  }

  onEditProfile(): void {
    this.isEditing = true;
    this.clearMessages();
    
    // Populate form with current values
    this.editForm.patchValue(this.originalValues);
    
    // Emit event to parent component
    this.editProfile.emit();
    console.log('Editing profile for:', this.name);
  }

  saveChanges(): void {
    if (this.editForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const formValues = this.editForm.value;
    const customerId = localStorage.getItem('customerId') || localStorage.getItem('userId') || '';
    const username = localStorage.getItem('username') || formValues.email;

    const updateRequest: ProfileUpdateRequest = {
      customerId: customerId,
      firstName: formValues.firstName,
      lastName: formValues.lastName || '',
      username: username,
      email: formValues.email,
      houseNo: formValues.houseNo || '',
      street: formValues.street || '',
      city: formValues.city || '',
      postalCode: formValues.postalCode || ''
    };

    // Make API call to update profile with authorization header
    this.http.put(`${environment.apiUrl}/api/CustomerProfile/profile`, updateRequest, { 
      headers: this.getAuthHeaders() 
    }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Profile updated successfully!';
        
        // Update localStorage with new values
        this.updateLocalStorage(formValues);
        
        // Refresh display data
        this.loadProfileData();
        
        // Exit edit mode after 2 seconds
        localStorage.clear();
        this.isEditing = false;
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || error.error?.error || 'Failed to update profile. Please try again.';
        console.log('Profile update failed:', error);
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          this.clearMessages();
        }, 5000);
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.clearMessages();
    
    // Reset form to original values
    this.editForm.patchValue(this.originalValues);
  }

  // Delete account confirmation methods
  showDeleteAccountConfirmation(): void {
    this.showDeleteConfirmation = true;
    this.clearMessages();
  }

  hideDeleteAccountConfirmation(): void {
    this.showDeleteConfirmation = false;
  }

  confirmDeleteAccount(): void {
    this.isDeleting = true;
    this.showDeleteConfirmation = false;
    this.clearMessages();

    const customerId = localStorage.getItem('customerId') || localStorage.getItem('userId') || '';
    
    if (!customerId) {
      this.isDeleting = false;
      this.errorMessage = 'Customer ID not found. Please try logging in again.';
      return;
    }

    // Make API call to delete account with authorization header
    this.http.delete(`${environment.apiUrl}/api/CustomerProfile/profile`, { 
      headers: this.getAuthHeaders() 
    }).subscribe({
      next: (response: any) => {
        this.isDeleting = false;
        this.successMessage = 'Account deleted successfully. Redirecting...';
        
        // Clear all localStorage data after successful deletion
        this.clearAllUserData();
        
        // Redirect to login/home page after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      },
      error: (error) => {
        this.isDeleting = false;
        this.errorMessage = error.error?.message || error.error?.error || 'Failed to delete account. Please try again.';
        
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          this.clearMessages();
        }, 5000);
      }
    });
  }

  private clearAllUserData(): void {
    // Clear all user-related data from localStorage
    const keysToRemove = [
      'token', 'authToken', 'userToken',
      'customerId', 'userId', 'username',
      'firstName', 'lastName', 'email',
      'contactNumbers', 'contactNumber',
      'houseNo', 'street', 'city', 'postalCode',
      // Add any other keys your app stores
      'userRole', 'loginTime', 'sessionId'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    // Alternative: Clear entire localStorage if you only store user data
     localStorage.clear();
  }

  private updateLocalStorage(formValues: any): void {
    localStorage.setItem('firstName', formValues.firstName);
    localStorage.setItem('lastName', formValues.lastName || '');
    localStorage.setItem('email', formValues.email);
    localStorage.setItem('houseNo', formValues.houseNo || '');
    localStorage.setItem('street', formValues.street || '');
    localStorage.setItem('city', formValues.city || '');
    localStorage.setItem('postalCode', formValues.postalCode || '');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      control?.markAsTouched();
    });
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  onViewCurrentOrders(): void {
    if (this.isEditing) return;
    this.viewCurrentOrders.emit();
    console.log('Viewing current orders for:', this.name);
  }

  onViewOrderHistory(): void {
    if (this.isEditing) return;
    this.viewOrderHistory.emit();
    console.log('Viewing order history for:', this.name);
  }

  logout(): void {
    this.clearAllUserData();
    window.location.href = '/';
  }
}