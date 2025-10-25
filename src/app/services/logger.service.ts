// src/app/services/logger.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private isDevelopment = !environment.production;

  log(...args: any[]): void {
    if (this.isDevelopment) console.log(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }

  warn(...args: any[]): void {
    if (this.isDevelopment) console.warn(...args);
  }

  debug(...args: any[]): void {
    if (this.isDevelopment) console.debug(...args);
  }

  info(...args: any[]): void {
    if (this.isDevelopment) console.info(...args);
  }
}