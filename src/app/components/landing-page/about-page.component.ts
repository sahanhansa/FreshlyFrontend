import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface TableCounts {
  customerCount: number;
  laundryCount: number;
  orderCount: number;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <div class="about-container">
      <app-header></app-header>
      <div class="header-section pt-[15vh]">
        <div class="logo">
          <img src="assets/images/freshly-logo.png" alt="Freshly Logo" class="logo-img"
            style="height:60px;width:auto;object-fit:contain;" />
        </div>
        <h2>About Us</h2>
        <p class="intro">Freshly is a comprehensive laundry management system that connects customers, laundries, and drivers to provide seamless pickup and delivery laundry services.</p>
      </div>

      <div class="content-section">
        <div class="mission-section">
          <h3 class="text-center">Our Mission</h3>
          <p>We believe that laundry shouldn't be a hassle. Our mission is to simplify laundry management by connecting customers with trusted laundries through our efficient pickup and delivery system, making clean clothes accessible and convenient for everyone.</p>
        </div>

        <div class="values-section">
          <h3 class="text-center">How It Works</h3>
          <div class="values-grid">
            <div class="value-item">
              <h4>👤 Customer Registration</h4>
              <p>Customers register on our platform and can easily book laundry services, select their preferred laundry, and schedule pickups.</p>
            </div>
            <div class="value-item">
              <h4>🏪 Laundry Partners</h4>
              <p>Registered laundries join our network to receive orders, manage their services, and connect with customers in their area.</p>
            </div>
            <div class="value-item">
              <h4>🚗 Driver Network</h4>
              <p>Our driver partners collect clothes from customers, deliver them to selected laundries, and return clean clothes back to customers.</p>
            </div>
            <div class="value-item">
              <h4>📱 Easy Management</h4>
              <p>Complete system integration allows real-time tracking, order management, and seamless communication between all parties.</p>
            </div>
          </div>
        </div>

        <div class="stats-section">
          <h3 class="text-center">Our Numbers</h3>
          <div *ngIf="error" class="text-red-500 text-center mb-4">
            {{ error }}
          </div>
          <div class="stats-grid">
            <div class="stat-item" *ngFor="let stat of stats">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div class="features-section">
          <h3 class="text-center">Key Features</h3>
          <div class="features-list">
            <div class="feature-item">
              <h4>📋 Customer Registration & Booking</h4>
              <p>Easy registration process for customers to book laundry services, select preferred laundries, and schedule convenient pickup times.</p>
            </div>
            <div class="feature-item">
              <h4>🏭 Laundry Partner Network</h4>
              <p>Comprehensive laundry registration system allowing local businesses to join our network and manage their services efficiently.</p>
            </div>
            <div class="feature-item">
              <h4>🚚 Driver Management System</h4>
              <p>Driver registration and assignment system for efficient pickup from customers and delivery to selected laundries and back.</p>
            </div>
            <div class="feature-item">
              <h4>📱 Real-time Tracking</h4>
              <p>Complete order tracking from pickup to delivery, with notifications and updates for customers, laundries, and drivers.</p>
            </div>
            <div class="feature-item">
              <h4>💳 Integrated Payment</h4>
              <p>Secure payment processing with multiple payment options for seamless transactions between all parties.</p>
            </div>
            <div class="feature-item">
              <h4>⭐ Rating & Reviews</h4>
              <p>Customer feedback system to maintain quality standards and help customers choose the best laundry services.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <app-footer></app-footer>
  `,
  styles: [`
    .about-container {
      max-width: 100%;
      margin: 0 auto;
      border-radius: 12px;
      padding: 50px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
      background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
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
      font-size: 2rem;
      color: white;
      font-weight: bold;
    }

    h2 {
      font-size: 2.5rem;
      color: #2c3e50;
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
      background: #0A84FF;
      border-radius: 2px;
    }

    .intro {
      font-size: 1.3rem;
      color: #666;
      max-width: 700px;
      margin: 20px auto 0;
      font-weight: 300;
    }

    .content-section {
      text-align: left;
    }

    .content-section h3 {
      font-size: 1.8rem;
      color: #2c3e50;
      margin: 40px 0 20px 0;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 10px;
    }

    .mission-section p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #555;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }

    .value-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #0A84FF;
      transition: all 0.3s ease;
    }

    .value-item:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }

    .value-item h4 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }

    .value-item p {
      color: #666;
      font-size: 0.95rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 30px;
      margin: 30px 0;
      text-align: center;
    }

    .stat-item {
      padding: 20px;
      background: #fff;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .stat-item:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }

    .stat-number {
      font-size: 2.2rem;
      font-weight: bold;
      color: #0A84FF;
      margin-bottom: 5px;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .features-section {
      margin-top: 40px;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .feature-item {
      padding: 20px;
      background: #fff;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      border-left: 4px solid #0A84FF;
      transition: all 0.3s ease;
    }

    .feature-item:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }

    .feature-item h4 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }

    .feature-item p {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 30px 25px;
      }
      
      h2 {
        font-size: 2rem;
      }

      .values-grid,
      .stats-grid,
      .features-list {
        grid-template-columns: 1fr;
      }
      
      .intro {
        font-size: 1.1rem;
      }

      .content-section h3 {
        font-size: 1.5rem;
      }
    }
  `],
})
export class AboutPageComponent implements OnInit {
  stats = [
    { number: '0', label: 'Active Customers' },
    { number: '0', label: 'Partner Laundries' },
    { number: '0', label: 'Orders Completed' },
  ];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTableCounts();
  }

  loadTableCounts(): void {
    this.http.get<TableCounts>(`${environment.apiUrl}/api/Basic/counts`).subscribe({
      next: (data) => {
        this.stats = [
          { number: data.customerCount.toString(), label: 'Active Customers' },
          { number: data.laundryCount.toString(), label: 'Partner Laundries' },
          { number: data.orderCount.toString(), label: 'Orders Completed' },
        ];
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        console.error('Error fetching table counts:', err);
      },
    });
  }
}