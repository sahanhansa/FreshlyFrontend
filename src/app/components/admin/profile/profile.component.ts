import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService, Profile } from '../../../services/profile.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    name: '',
    email: '',
    role: 'admin'
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data: Profile) => {
        this.profile = data;
      },
      error: (error: Error) => {
        this.errorMessage = 'Failed to load profile';
        console.error('Error loading profile:', error);
      }
    });
  }

  onSubmit(): void {
    this.profileService.updateProfile(this.profile).subscribe({
      next: (response: Profile) => {
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error: Error) => {
        this.errorMessage = 'Failed to update profile';
        console.error('Error updating profile:', error);
      }
    });
  }
}