import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
import { BasketComponent } from './pages/order/basket/basket.component';
import { ItemPageComponent } from './pages/order/item-list-page/item-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'order', component: LaundryPageComponent },
  { path: 'basket', component: BasketComponent },
  {path: 'laundry/:id', component: ItemPageComponent},
  // Other routes (these won't show anything for now)
  // { path: 'home', component: LaundryPageComponent },
  // { path: 'how-it-works', component: LaundryPageComponent },
  // { path: 'contact-us', component: LaundryPageComponent },
  // { path: 'profile', component: LaundryPageComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
