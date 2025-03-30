import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';

export const routes: Routes = [
  { path: '', component: LaundryPageComponent }, // Default route
  { path: 'laundries', component: LaundryPageComponent }, // Route for the laundry page
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // other providers...
  ],
};
