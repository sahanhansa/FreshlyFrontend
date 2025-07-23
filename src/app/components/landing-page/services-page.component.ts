import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Service {
  name: string;
  description: string;
  price: string;
  turnaround: string;
  features: string[];
  icon: string;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <div class="services-container">
      <app-header></app-header>

      <!-- Hero Section -->
      <section class="header-section pt-[15vh]">
        <div class="logo">
          <img src="assets/images/freshly-logo.png" alt="Freshly Logo" class="logo-img"
            style="height:60px;width:auto;object-fit:contain;" />
        </div>
        <h2>Premium Laundry Services</h2>
        <p class="intro">Discover our professional cleaning solutions designed for your busy lifestyle. Choose from a range of services tailored to your needs.</p>
        
      </section>

      <!-- Services Section -->
      <section class="content-section">
        <div class="text-center mb-16">
          <h3>Our Services</h3>
          <p class="intro">From everyday washing to specialized cleaning, we've got you covered.</p>
        </div>

        <div class="services-grid">
          <div *ngFor="let service of services" class="service-item">
            <div class="service-icon">{{ service.icon }}</div>
            <h4>{{ service.name }}</h4>
            <p>{{ service.description }}</p>
            <div class="service-details">
              <span class="price">{{ service.price }}</span>
              <span class="turnaround">{{ service.turnaround }}</span>
            </div>
            <ul class="feature-list">
              <li *ngFor="let feature of service.features">{{ feature }}</li>
            </ul>
            <button class="select-btn">Select Service</button>
          </div>
        </div>
      </section>

      </div>
      <app-footer></app-footer>
  `,
  styles: [`
    .services-container {
      max-width: 100%;
      margin: 0 auto;
      border-radius: 12px;
      padding: 50px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
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
      background: #667eea;
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
      text-align: center;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }

    .service-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      text-align: center;
    }

    .service-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .service-item h4 {
      color: #2c3e50;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    .service-item p {
      color: #666;
      font-size: 0.95rem;
      margin-bottom: 15px;
    }

    .service-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
    }

    .turnaround {
      font-size: 0.9rem;
      color: #666;
    }

    .feature-list {
      text-align: left;
      list-style: none;
      padding: 0;
      margin-bottom: 20px;
    }

    .feature-list li {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 8px;
      position: relative;
      padding-left: 20px;
    }

    .feature-list li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #667eea;
    }

    .select-btn {
      width: 100%;
      background: #667eea;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .select-btn:hover {
      background: #5a6ed6;
    }

    @media (max-width: 768px) {
      .services-container {
        padding: 30px 25px;
      }

      h2 {
        font-size: 2rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .intro {
        font-size: 1.1rem;
      }

      .content-section h3 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ServicesPageComponent {
  services: Service[] = [
    {
      name: 'Wash & Fold',
      description: 'Professional washing, drying, and folding service for your everyday clothes.',
      price: '$2.50/lb',
      turnaround: '24-48 hours',
      features: [
        'Pre-treatment of stains',
        'Fabric softener included',
        'Neat folding',
        'Eco-friendly detergent'
      ],
      icon: '👕'
    },
    {
      name: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate fabrics and formal wear.',
      price: '$8.99/item',
      turnaround: '2-3 days',
      features: [
        'Delicate fabric care',
        'Steam pressing',
        'Stain removal',
        'Garment inspection'
      ],
      icon: '🤵'
    },
    {
      name: 'Express Service',
      description: 'Same-day laundry service for urgent cleaning needs.',
      price: '$4.00/lb',
      turnaround: '4-6 hours',
      features: [
        'Same-day pickup & delivery',
        'Rush processing',
        '24/7 availability',
        'Priority handling'
      ],
      icon: '⚡'
    }
  ];
}