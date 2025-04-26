import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

interface Profile {
  id?: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
      next: (data) => {
        this.profile = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load profile';
        console.error('Error loading profile:', error);
      }
    });
  }

  onSubmit(): void {
    this.profileService.updateProfile(this.profile).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update profile';
        console.error('Error updating profile:', error);
      }
    });
  }
} 