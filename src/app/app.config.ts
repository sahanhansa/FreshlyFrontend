import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
import { ItemsListPageComponent } from './pages/order/items-list-page/items-list-page.component';

export const routes: Routes = [
  { path: '', component: LaundryPageComponent },
  { path: 'items/:id', component: ItemsListPageComponent } // Route with laundry ID

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // other providers...
  ],
};
