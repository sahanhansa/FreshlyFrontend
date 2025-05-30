import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = `${environment.apiUrl}/api/Feedback`;
  // Temporary laundryId for testing - replace with actual ID in production
  private readonly TEST_LAUNDRY_ID = 'efaa5020-331b-11f0-a791-c138d5830fc3';

  constructor(private http: HttpClient) {}

getFeedbacks(id: string = this.TEST_LAUNDRY_ID): Observable<Feedback[]> {
  return this.http.get<Feedback[]>(`${this.baseUrl}/get-feedbacks/${id}`);
}
}




