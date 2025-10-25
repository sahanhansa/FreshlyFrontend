// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../shared/constants/storage.constants';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = localStorage;

  get<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  // Specific getters
  getLaundryId(): string | null {
    return this.storage.getItem(STORAGE_KEYS.LAUNDRY_ID);
  }

  getUserId(): string | null {
    return this.storage.getItem(STORAGE_KEYS.USER_ID);
  }

  getToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.TOKEN);
  }

  getAdminUsername(): string | null {
    return this.storage.getItem(STORAGE_KEYS.ADMIN_USERNAME);
  }

  // Specific setters
  setLaundryId(id: string): void {
    this.storage.setItem(STORAGE_KEYS.LAUNDRY_ID, id);
  }

  setUserId(id: string): void {
    this.storage.setItem(STORAGE_KEYS.USER_ID, id);
  }

  setToken(token: string): void {
    this.storage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  setAdminUsername(username: string): void {
    this.storage.setItem(STORAGE_KEYS.ADMIN_USERNAME, username);
  }

  // Clear all
  clearAll(): void {
    this.storage.clear();
  }
}