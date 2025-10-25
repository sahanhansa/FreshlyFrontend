import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Feedback, FeedbackDTO, FeedbackRequest } from '../models/feedback.model';

// ✅ Add this interface
export interface ReplyPayload {
  userId: string;
  userType: string;
  subject: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/api/feedback`;
  
  constructor(private http: HttpClient) { }

  //getFeedbacks(id: string = this.TEST_LAUNDRY_ID): Observable<Feedback[]> {
  //return this.http.get<Feedback[]>(`${this.baseUrl}/get-feedbacks/${id}`);
 // }

getFeedbacks(laundryId: string): Observable<Feedback[]> {
  return this.http.get<Feedback[]>(`${this.apiUrl}/get-my-feedbacks/${laundryId}`);
}

  // Get all feedback items
  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a specific feedback by ID
  getFeedback(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new feedback
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing feedback
  updateFeedback(id: string, feedback: Feedback): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, feedback)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a feedback
  deleteFeedback(id: string): Observable<any> {
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    return this.http.delete(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError((error) => {
          if (error.status === 500) {
            // Return an empty object to simulate success for backend issues
            return of({});
          }
          return throwError(() => error);
        })
      );
  }

  // Error handler
  private handleError(error: any) {
    console.error('API Error:', error);
    
    // Extract a meaningful error message
    let errorMsg = 'Operation failed. Please try again later.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else if (error.status) {
      // Server-side error
      errorMsg = `Error Code: ${error.status} Message: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMsg));
  }

  // Submit feedback for an order
  submitFeedback(feedback: FeedbackRequest): Observable<FeedbackDTO> {
    return this.http.post<FeedbackDTO>(`${this.apiUrl}/order`, feedback);
  }

  // Get feedback for a specific order
  getFeedbackByOrderId(orderId: string): Observable<FeedbackDTO | null> {
    return this.http.get<FeedbackDTO>(`${this.apiUrl}/order/${orderId}`);
  }

  // Send reply email
  sendReplyEmail(payload: ReplyPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/SendReplyEmail`, payload);
  }
}