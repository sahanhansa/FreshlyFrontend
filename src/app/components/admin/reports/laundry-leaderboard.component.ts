
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface LaundryLeaderboardItem {
  laundryId: string;
  laundryName: string;
  email: string;
  laundryImageLink: string;
  averageRating: number;
}

@Component({
  selector: 'app-laundry-leaderboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h4 class="text-gray-600 mb-4 text-lg font-semibold">Laundry Leaderboard</h4>
      <table class="min-w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">#</th>
            <th class="px-4 py-2 text-left">Laundry</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Average Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of leaderboard; let i = index">
            <td class="px-4 py-2">{{ i + 1 }}</td>
            <td class="px-4 py-2 flex items-center gap-2">
              <img *ngIf="item.laundryImageLink" [src]="item.laundryImageLink" alt="Laundry" class="w-8 h-8 rounded-full object-cover border" />
              <span>{{ item.laundryName }}</span>
            </td>
            <td class="px-4 py-2">{{ item.email }}</td>
            <td class="px-4 py-2 font-semibold">{{ item.averageRating | number:'1.1-2' }}</td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="leaderboard.length === 0" class="text-gray-400 text-center py-4">No data available.</div>
    </div>
  `,
  styleUrls: []
})
export class LaundryLeaderboardComponent implements OnInit {
  leaderboard: LaundryLeaderboardItem[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<LaundryLeaderboardItem[]>(`${environment.apiUrl}/api/Feedback/laundry-ratings`).subscribe({
      next: (data) => {
        console.log('Laundry leaderboard data:', data);
        this.leaderboard = (data || []).sort((a, b) => b.averageRating - a.averageRating);
      },
      error: (err) => {
        console.error('Laundry leaderboard error:', err);
        this.leaderboard = [];
      }
    });
  }
}
