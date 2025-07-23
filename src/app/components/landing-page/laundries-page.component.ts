import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Laundry {
  id: number;
  name: string;
  address: string;
  contact: string;
  imageUrl: string;
}

@Component({
  selector: 'app-laundries-page',
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  template: `
    <div class="laundries-container">
      <app-header></app-header>
      <div class="header-section pt-[15vh]">
        <div class="logo">
          <img src="assets/images/freshly-logo.png" alt="Freshly Logo" class="logo-img"
            style="height:60px;width:auto;object-fit:contain;" />
        </div>
        <h2>Our Partner Laundries</h2>
        <p class="intro">Explore our network of trusted laundry partners who provide top-quality cleaning services to ensure your clothes are fresh and spotless.</p>
      </div>

      <div class="content-section">
        <div class="laundries-grid">
          <div *ngFor="let laundry of laundries" class="laundry-item">
            <img [src]="laundry.imageUrl" [alt]="laundry.name" class="laundry-img" />
            <div class="laundry-details">
              <h4>{{ laundry.name }}</h4>
              <p><strong>Address:</strong> {{ laundry.address }}</p>
              <p><strong>Contact:</strong> {{ laundry.contact }}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <app-footer></app-footer>
  `,
  styles: [`
    .laundries-container {
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

    .laundries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin: 30px 0;
    }

    .laundry-item {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .laundry-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 15px;
    }

    .laundry-details h4 {
      color: #2c3e50;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    .laundry-details p {
      color: #666;
      font-size: 0.95rem;
      margin: 5px 0;
    }

    .laundry-details p strong {
      color: #2c3e50;
    }

    @media (max-width: 768px) {
      .laundries-container {
        padding: 30px 25px;
      }

      h2 {
        font-size: 2rem;
      }

      .laundries-grid {
        grid-template-columns: 1fr;
      }

      .intro {
        font-size: 1.1rem;
      }

      .laundry-img {
        height: 150px;
      }
    }
  `],
  standalone: true
})
export class LaundriesPageComponent implements OnInit {
  laundries: Laundry[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Laundry[]>('/api/laundries').subscribe({
      next: (data) => {
        this.laundries = data;
      },
      error: (error) => {
        console.error('Error fetching laundries:', error);
      }
    });
  }
}