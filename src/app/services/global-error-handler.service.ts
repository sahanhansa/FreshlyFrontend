// src/app/services/global-error-handler.service.ts
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private logger: LoggerService
  ) {}

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      // Server error
      this.logger.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url,
        error: error.error
      });
      
      // You can add toast notifications or other user feedback here
      const userMessage = this.getUserFriendlyMessage(error);
      console.error(userMessage);
      
    } else {
      // Client error
      this.logger.error('Client Error:', error);
      console.error('An unexpected error occurred:', error.message);
    }
  }

  private getUserFriendlyMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.status === 401) {
      return 'Session expired. Please login again.';
    }
    if (error.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status >= 500) {
      return 'Server error occurred. Please try again later.';
    }
    return error.error?.message || 'An error occurred. Please try again.';
  }
}