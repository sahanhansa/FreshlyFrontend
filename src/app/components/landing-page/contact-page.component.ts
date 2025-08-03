import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <div class="contact-container">
      <app-header></app-header>

      <div class="header-section pt-[15vh]">
        <div class="logo">
          <img src="assets/images/freshly-logo.png" alt="Freshly Logo" class="logo-img" style="height:60px;width:auto;object-fit:contain;" />
        </div>
        <h2>Contact Us</h2>
        <p class="intro">Get in touch with Freshly! Whether you have questions, feedback, or need support, we're here to help you with your laundry needs.</p>
      </div>

      <div class="content-section">
        <div class="contact-info-section">
          <h3 class="text-center">Our Contact Information</h3>
          <div class="contact-grid">
            <div class="contact-item">
              <h4>📍 Address</h4>
              <p>123 Freshly Lane, Clean City, CC 12345</p>
            </div>
            <div class="contact-item">
              <h4>📧 Email</h4>
              <p>supportfreshly.com</p>
            </div>
            <div class="contact-item">
              <h4>📞 Phone</h4>
              <p>+1 (800) 555-1234</p>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="text-center">Send Us a Message</h3>
          <form class="contact-form" (ngSubmit)="sendMessage()">
            <div class="form-group">
              <label for="name">Name</label>
              <input [(ngModel)]="formData.name" name="name" required placeholder="Your Name">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input [(ngModel)]="formData.email" name="email" required type="email" placeholder="Your Email">
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input [(ngModel)]="formData.subject" name="subject" required placeholder="Subject">
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea [(ngModel)]="formData.message" name="message" required rows="5" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" class="submit-btn" [disabled]="sending">
              {{ sending ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>

      </div>
      <app-footer></app-footer>
  `,
  styles: [`
    .contact-container {
      max-width: 100%;
      margin: 0 auto;
      border-radius: 12px;
      padding: 50px;
      box-shadow: 0 4px 20px rgba(0, 0, 255, 0.1);
      border: 1px solid #e3e6ff;
    }

    .header-section {
      text-align: center;
      margin-bottom: 50px;
    }

    .logo {
      width: 100px;
      height: 100px;
      background: white;
      border-radius: 50%;
      margin: 0 auto 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 2.5rem;
      color: #1e3a8a;
      margin-bottom: 30px;
      position: relative;
      display: inline-block;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: #3b82f6;
      border-radius: 2px;
    }

    .intro {
      font-size: 1.3rem;
      color: #4b5563;
      max-width: 700px;
      margin: 20px auto 0;
      font-weight: 300;
    }

    .content-section {
      text-align: left;
    }

    .content-section h3 {
      font-size: 1.8rem;
      color: #1e3a8a;
      margin: 40px 0 20px 0;
      border-bottom: 2px solid #dbeafe;
      padding-bottom: 10px;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }

    .contact-item {
      padding: 20px;
      background: #eff6ff;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
      text-align: center;
    }

    .contact-item h4 {
      color: #1e3a8a;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }

    .contact-item p {
      color: #4b5563;
      font-size: 0.95rem;
    }

    .form-section {
      margin-top: 40px;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group label {
      color: #1e3a8a;
      font-size: 1rem;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #dbeafe;
      border-radius: 6px;
      font-size: 1rem;
      color: #1f2937;
      background: #fff;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }

    .submit-btn {
      background: #3b82f6;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      align-self: center;
    }

    .submit-btn:hover {
      background: #2563eb;
    }

    @media (max-width: 768px) {
      .contact-container {
        padding: 30px 25px;
      }
      h2 {
        font-size: 2rem;
      }
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .intro {
        font-size: 1.1rem;
      }
      .content-section h3 {
        font-size: 1.5rem;
      }
      .form-section {
        padding: 0 15px;
      }
    }
  `]
})
export class ContactPageComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  sending = false;

  sendMessage() {
    this.sending = true;

    const serviceId = 'service_brtgbzj';
    const templateId = 'template_xnxo5cv';
    const publicKey = 'hW2OMXGUWTZq3Kr8f';

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        alert('Your message has been sent successfully!');
        this.formData = { name: '', email: '', subject: '', message: '' };
        this.sending = false;
      }, () => {
        alert('Failed to send message. Please try again.');
        this.sending = false;
      });
  }
}