import { Component } from '@angular/core';
import { InsightsComponent } from '../../../components/laundry/insights/insights.component';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-laundry-insights-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, InsightsComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="flex-grow bg-white min-h-screen">
      <app-insights></app-insights>
    </main>
    <app-footer></app-footer>
  `
})
export class LaundryInsightsPage {} 