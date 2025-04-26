import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('Bootstrapping Angular application...');
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application successfully bootstrapped'))
  .catch((err) => console.error('Bootstrap error:', err));
