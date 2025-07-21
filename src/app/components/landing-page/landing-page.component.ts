import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: true,
    imports: [NgClass, NgFor, FooterComponent]
    imports: [NgClass, NgFor, NgIf, FooterComponent, RouterModule]
})
export class LandingPageComponent {
    // For animated bubbles in hero image
    bubbles = Array(4);
    
    constructor(private router: Router) { }
    
    // Enhanced goTo method to handle both login and signup
    goTo(link: string, action?: 'login' | 'signup') {
        localStorage.setItem("Link", link);
        
        switch (link) {
            case 'whoareyou':
                if (action) {
                    // Navigate with query parameter to specify action
                    this.router.navigate(['/whoareyou'], { 
                        queryParams: { action: action } 
                    });
                } else {
                    // Default navigation (login)
                    this.router.navigate(['/whoareyou']);
                }
                break;
            default:
                console.error('Invalid link:', link);
        }
    }

    // Separate methods for cleaner template usage
    navigateToLogin() {
        this.goTo('whoareyou', 'login');
    }

    navigateToSignup() {
        this.goTo('whoareyou', 'signup');
    }

    // Steps for the process section
    processSteps = [
        {
            stepNumber: 1,
            title: 'Pickup',
            imagePath: 'assets/images/landing/Address.png',
            stepLabel: 'STEP 1'
        },
        {
            stepNumber: 2,
            title: 'Wash & Dry',
            imagePath: 'assets/images/landing/2.png',
            stepLabel: 'STEP 2'
        },
        {
            stepNumber: 3,
            title: 'Fold',
            imagePath: 'assets/images/landing/3.png',
            stepLabel: 'STEP 3'
        },
        {
            stepNumber: 4,
            title: 'Delivery',
            imagePath: 'assets/images/landing/4.png',
            stepLabel: 'STEP 4'
        }
    ];

    // Stats for about section
    stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '50+', label: 'Partner Laundries' },
        { number: '100K+', label: 'Orders Completed' }
    ];

    // Laundries for laundries section
    laundries = [
        { name: 'Sparkle Cleaners', location: 'New York, NY', features: ['Eco-friendly', 'Express Service', 'Affordable'] },
        { name: 'Quick Wash', location: 'Los Angeles, CA', features: ['24/7 Service', 'Premium Care', 'Pickup & Delivery'] },
        { name: 'Fresh Start Laundry', location: 'Chicago, IL', features: ['Family Owned', 'Modern Machines', 'Great Reviews'] }
    ];

    // Business benefits
    businessBenefits = [
        { iconClass: 'pickup', text: 'Grow your customer base' },
        { iconClass: 'wash', text: 'Easy order management' },
        { iconClass: 'delivery', text: 'Increase your revenue' }
    ];
}