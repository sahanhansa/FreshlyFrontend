import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface Laundry {
  laundryId: string;
  laundryName: string;
}

export interface Service {
  serviceId: string;
  serviceName: string;
}

export interface ImageUploadResponse {
  message: string;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl = 'https://localhost:5027/api'; 

  constructor(private http: HttpClient) {}

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getCategoryIdByName(categoryName: string): Observable<{ categoryId: string }> {
    return this.http.get<{ categoryId: string }>(`${this.baseUrl}/ItemCategory/GetCategoryIdByName/${encodeURIComponent(categoryName)}`);
  }

  getServiceIdByName(serviceName: string): Observable<{ serviceId: string }> {
    return this.http.get<{ serviceId: string }>(`${this.baseUrl}/Service/GetServiceIdByName/${encodeURIComponent(serviceName)}`);
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(`${this.baseUrl}/Image/upload`, formData);
  }

  getGarmentTypeIdByName(name: string): Observable<{ garmentTypeId: string | boolean, message?: string }> {
    return this.http.get<{ garmentTypeId: string | boolean, message?: string }>(`${this.baseUrl}/Item/garment-type-id-by-name/${encodeURIComponent(name)}`);
  }

  // Note: addGarmentType is no longer needed as the backend automatically creates garment types
  // when calling getGarmentTypeIdByName with a non-existent name
}
