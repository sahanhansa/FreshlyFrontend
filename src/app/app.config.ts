import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LaundryPageComponent } from './pages/order/laundry-list-page/laundry-list-page.component';
import { ItemsListPageComponent } from './pages/order/items-list-page/items-list-page.component';
import {  routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './services/global-error-handler.service';

// export const routes: Routes = [
//   // { path: '', component: LaundryPageComponent },
//   { path: 'items/:id', component: ItemsListPageComponent } // Route with laundry ID
 
// ];
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  
};