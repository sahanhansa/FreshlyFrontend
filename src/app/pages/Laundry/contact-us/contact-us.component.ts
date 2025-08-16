import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LaundryService } from '../../../services/laundry.service';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "@app/components/shared/navbar/navbar.component";
import { FooterComponent } from '@app/components/shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent,FooterComponent,CommonModule ],
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string = '';
  laundryId: string | null = null;
  isSubjectDropdownOpen: boolean = false;

  constructor(private fb: FormBuilder, private laundryService: LaundryService, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      laundryName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      ownerName: [{ value: '', disabled: true }, Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.fetchLaundryDetails();
  }

  fetchLaundryDetails() {
    this.laundryId = localStorage.getItem('laundryId');
    if (!this.laundryId) {
      this.error = 'Laundry ID not found.';
      return;
    }
    this.loading = true;
    this.laundryService.getLaundryByIdString(this.laundryId).subscribe({
      next: (data) => {
        this.contactForm.patchValue({
          laundryName: data.laundryName || '',
          email: data.email || '',
          ownerName: data.ownerName || ''
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch laundry details.';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.contactForm.invalid || !this.laundryId) return;
    
    this.loading = true;
    this.error = null;
    
    const payload = {
      laundryID: this.laundryId,
      selectedSubject: this.contactForm.get('subject')?.value,
      message: this.contactForm.get('message')?.value
    };
    
    this.laundryService.addMessage(payload).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contactForm.get('subject')?.reset('');
        this.contactForm.get('message')?.reset('');
        this.loading = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.error = 'Failed to send message. Please try again.';
        this.loading = false;
      }
    });
  }

  toggleSubjectDropdown(): void {
    this.isSubjectDropdownOpen = !this.isSubjectDropdownOpen;
  }

  selectSubject(subject: string): void {
    this.contactForm.get('subject')?.setValue(subject);
    this.isSubjectDropdownOpen = false;
  }

  getSelectedSubject(): string {
    const subject = this.contactForm.get('subject')?.value;
    return subject || 'Select Subject';
  }
}
