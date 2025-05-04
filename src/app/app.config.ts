// import { ApplicationConfig } from '@angular/core';
// import { provideRouter, Routes } from '@angular/router';
// import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
// import { ItemsListPageComponent } from './pages/order/items-list-page/items-list-page.component';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// export const routes: Routes = [
//   { path: '', component: LaundryPageComponent },
//   { path: 'items/:id', component: ItemsListPageComponent }]; // Route with laundry ID
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  // providers: [
  //   provideRouter(routes),
  //   // other providers...
  // ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient()]
};
