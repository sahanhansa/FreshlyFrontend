import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideHttpClient,withFetch } from '@angular/common/http';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
    // other providers...
  ],
};
