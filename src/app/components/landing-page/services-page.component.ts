import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  features: string[];
}

interface LaundryProvider {
  id: number;
  name: string;
  rating: number;
  location: string;
  services: string[];
  image: string;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Hero Section -->
    <nav class="navbar">
            <div class="nav-brand">
                <div class="logo">
                    <img src="assets/images/freshly-logo.png" alt="Freshly Logo" class="logo-img"
                        style="height:60px;width:auto;object-fit:contain;" />

                </div>
            </div>
            <ul class="nav-menu">
                <li>
                  <a 
                    routerLink="/" 
                    routerLinkActive="font-semibold text-blue-500" 
                    [ngClass]="'  px-3 py-2 transition-colors duration-200'"
                  >Home</a>
                </li>
                <li>
                  <a 
                    routerLink="/services" 
                    routerLinkActive="font-semibold text-black" 
                    [ngClass]="'text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200'"
                  >Services</a>
                </li>
                <li>
                  <a 
                    routerLink="/about" 
                    routerLinkActive="font-semibold text-black" 
                    [ngClass]="'text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200'"
                  >About Us</a>
                </li>
                <li>
                  <a 
                    routerLink="/laundries" 
                    routerLinkActive="font-semibold text-black" 
                    [ngClass]="'text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200'"
                  >Laundries</a>
                </li>
                <li>
                  <a 
                    routerLink="/contact" 
                    routerLinkActive="font-semibold text-black" 
                    [ngClass]="'text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200'"
                  >Contact us</a>
                </li>
            </ul>
        </nav>
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative container mx-auto px-6 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Premium <span class="text-cyan-300">Laundry Services</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-up animation-delay-300">
            Professional cleaning solutions for your busy lifestyle
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button (click)="scrollToServices()" 
                    class="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View Services
            </button>
            <button (click)="showRegistration = true"
                    class="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            From everyday washing to specialized cleaning, we've got you covered
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let service of services; let i = index" 
               class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
               [style.animation-delay]="i * 100 + 'ms'"
               [@slideInUp]>
            <div class="p-8">
              <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {{ service.icon }}
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">{{ service.name }}</h3>
              <p class="text-gray-600 mb-6">{{ service.description }}</p>
              
              <div class="flex justify-between items-center mb-6">
                <span class="text-2xl font-bold text-blue-600">{{ service.price }}</span>
                <span class="text-sm text-gray-500">{{ service.duration }}</span>
              </div>

              <ul class="space-y-2 mb-6">
                <li *ngFor="let feature of service.features" 
                    class="flex items-center text-sm text-gray-600">
                  <span class="text-green-500 mr-2">✓</span>
                  {{ feature }}
                </li>
              </ul>

              <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Select Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Laundry Providers Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Top Rated Laundry Partners</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified and trusted laundry service providers in your area
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let provider of laundryProviders; let i = index"
               class="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
               [style.animation-delay]="i * 150 + 'ms'">
            <div class="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div class="text-6xl">{{ provider.image }}</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ provider.name }}</h3>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400 mr-2">
                  <span *ngFor="let star of getStars(provider.rating)">⭐</span>
                </div>
                <span class="text-gray-600 text-sm">({{ provider.rating }}/5)</span>
              </div>
              <p class="text-gray-600 text-sm mb-4">📍 {{ provider.location }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let service of provider.services.slice(0, 3)"
                      class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {{ service }}
                </span>
              </div>

              <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p class="text-xl text-gray-600">Simple steps to get your laundry done</p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div *ngFor="let step of steps; let i = index" 
               class="text-center group"
               [style.animation-delay]="i * 200 + 'ms'">
            <div class="bg-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <span class="text-3xl">{{ step.icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration Modal -->
    <div *ngIf="showRegistration" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Join Our Platform</h3>
          <button (click)="showRegistration = false" 
                  class="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <form (ngSubmit)="submitRegistration()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" [(ngModel)]="registrationData.name" name="name"
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                   placeholder="Enter your full name" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" [(ngModel)]="registrationData.email" name="email"
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                   placeholder="Enter your email" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" [(ngModel)]="registrationData.phone" name="phone"
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                   placeholder="Enter your phone number" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
            <select [(ngModel)]="registrationData.userType" name="userType"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" required>
              <option value="">Select option</option>
              <option value="customer">Customer looking for laundry services</option>
              <option value="provider">Laundry service provider</option>
            </select>
          </div>

          <button type="submit" 
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            Register Now
          </button>
        </form>
      </div>
    </div>

    <!-- Success Message -->
    <div *ngIf="showSuccess" 
         class="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right">
      <div class="flex items-center">
        <span class="mr-2">✅</span>
        Registration successful! Welcome to our platform.
      </div>
    </div>
  `,
  styles: [`
    /* Header */
 .header {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     background: rgba(255, 255, 255, 0.95);
     backdrop-filter: blur(10px);
     z-index: 1000;
     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
 }

 .navbar {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 1rem 2rem;
 }

 .logo {
     display: flex;
     align-items: center;
     gap: 0.5rem;
 }

 .logo-icon {
     position: relative;
     width: 40px;
     height: 40px;
     background: linear-gradient(135deg, #1e9eff, #0066cc);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
 }

 .bubble {
     position: absolute;
     background: rgba(255, 255, 255, 0.8);
     border-radius: 50%;
     animation: float 2s ease-in-out infinite;
 }


.step-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.step-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Center the process step image */
.step-card .flex.items-center.justify-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

 .bubble-1 {
     width: 8px;
     height: 8px;
     top: 8px;
     left: 10px;
 }

 .bubble-2 {
     width: 6px;
     height: 6px;
     top: 15px;
     right: 8px;
     animation-delay: 0.5s;
 }

 .bubble-3 {
     width: 4px;
     height: 4px;
     bottom: 8px;
     left: 15px;
     animation-delay: 1s;
 }

 @keyframes float {

     0%,
     100% {
         transform: translateY(0px);
     }

     50% {
         transform: translateY(-3px);
     }
 }

 .brand-name {
     font-size: 1.5rem;
     font-weight: 700;
     color: #1e9eff;
 }

    .nav-menu {
     display: flex;
     list-style: none;
     gap: 4rem;
     font-weight: 300;
 }

 .nav-menu a {
     text-decoration: none;
     color: #333;
     font-weight: 500;
     transition: color 0.3s;
 }

 .nav-menu a:hover {
     color: #1e9eff;
 }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    .animate-scale-in {
      animation: scaleIn 0.3s ease-out forwards;
    }

    .animate-slide-in-right {
      animation: slideInRight 0.5s ease-out forwards;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
    }

    .animation-delay-600 {
      animation-delay: 0.6s;
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
  `],
  animations: []
})
export class ServicesPageComponent {
  showRegistration = false;
  showSuccess = false;

  registrationData = {
    name: '',
    email: '',
    phone: '',
    userType: ''
  };

  services: Service[] = [
    {
      id: 1,
      name: 'Wash & Fold',
      description: 'Professional washing, drying, and folding service for your everyday clothes.',
      price: '$2.50/lb',
      duration: '24-48 hours',
      icon: '👕',
      features: ['Pre-treatment of stains', 'Fabric softener included', 'Neat folding', 'Eco-friendly detergent']
    },
    {
      id: 2,
      name: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate fabrics and formal wear.',
      price: '$8.99/item',
      duration: '2-3 days',
      icon: '🤵',
      features: ['Delicate fabric care', 'Steam pressing', 'Stain removal', 'Garment inspection']
    },
    {
      id: 3,
      name: 'Express Service',
      description: 'Same-day laundry service for urgent cleaning needs.',
      price: '$4.00/lb',
      duration: '4-6 hours',
      icon: '⚡',
      features: ['Same-day pickup & delivery', 'Rush processing', '24/7 availability', 'Priority handling']
    },
    {
      id: 4,
      name: 'Bedding & Linens',
      description: 'Specialized cleaning for comforters, pillows, and bed linens.',
      price: '$15.99/set',
      duration: '2-3 days',
      icon: '🛏️',
      features: ['Deep cleaning', 'Allergen removal', 'Fluffing service', 'Fresh scent treatment']
    },
    {
      id: 5,
      name: 'Shoe Cleaning',
      description: 'Professional shoe cleaning and restoration services.',
      price: '$12.99/pair',
      duration: '3-5 days',
      icon: '👟',
      features: ['Deep cleaning', 'Odor elimination', 'Leather conditioning', 'Waterproofing']
    },
    {
      id: 6,
      name: 'Pickup & Delivery',
      description: 'Convenient doorstep pickup and delivery service.',
      price: '$4.99/trip',
      duration: 'Scheduled',
      icon: '🚚',
      features: ['Contactless service', 'Flexible scheduling', 'Real-time tracking', 'Secure handling']
    }
  ];

  laundryProviders: LaundryProvider[] = [
    {
      id: 1,
      name: 'Fresh Clean Laundromat',
      rating: 4.8,
      location: 'Downtown Area',
      services: ['Wash & Fold', 'Dry Cleaning', 'Express'],
      image: '🏪'
    },
    {
      id: 2,
      name: 'Sparkle Dry Cleaners',
      rating: 4.9,
      location: 'Uptown District',
      services: ['Dry Cleaning', 'Alterations', 'Leather Care'],
      image: '✨'
    },
    {
      id: 3,
      name: 'Quick Wash Express',
      rating: 4.7,
      location: 'Suburb Plaza',
      services: ['Express Service', 'Pickup & Delivery', 'Wash & Fold'],
      image: '💨'
    },
    {
      id: 4,
      name: 'Eco Clean Solutions',
      rating: 4.6,
      location: 'Green Valley',
      services: ['Eco-Friendly', 'Organic Cleaning', 'Pet-Safe'],
      image: '🌿'
    },
    {
      id: 5,
      name: 'Premium Laundry Co.',
      rating: 4.9,
      location: 'Business District',
      services: ['Luxury Care', 'Same-Day', 'Concierge'],
      image: '👑'
    },
    {
      id: 6,
      name: 'Family Wash House',
      rating: 4.5,
      location: 'Residential Area',
      services: ['Family Packs', 'Bulk Washing', 'Kids Clothes'],
      image: '👨‍👩‍👧‍👦'
    }
  ];

  steps = [
    { icon: '📱', title: 'Book Online', description: 'Schedule your pickup through our app or website' },
    { icon: '🚚', title: 'We Collect', description: 'Our team picks up your laundry from your doorstep' },
    { icon: '🧽', title: 'We Clean', description: 'Professional cleaning using premium detergents' },
    { icon: '📦', title: 'We Deliver', description: 'Fresh, clean clothes delivered back to you' }
  ];

  scrollToServices() {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  submitRegistration() {
    if (this.registrationData.name && this.registrationData.email && 
        this.registrationData.phone && this.registrationData.userType) {
      
      // Simulate registration process
      console.log('Registration submitted:', this.registrationData);
      
      this.showRegistration = false;
      this.showSuccess = true;
      
      // Reset form
      this.registrationData = {
        name: '',
        email: '',
        phone: '',
        userType: ''
      };

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }
}