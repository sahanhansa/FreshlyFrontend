# Refactoring Guide - Using New Utilities

## 📦 New Services & Utilities Created

### 1. **StorageService** - Centralized LocalStorage Management
Located: `src/app/services/storage.service.ts`

**Before:**
```typescript
const laundryId = localStorage.getItem('laundryId');
localStorage.setItem('userId', userId);
```

**After:**
```typescript
constructor(private storage: StorageService) {}

const laundryId = this.storage.getLaundryId();
this.storage.setUserId(userId);
```

**Available Methods:**
- `getLaundryId()` / `setLaundryId(id: string)`
- `getUserId()` / `setUserId(id: string)`
- `getToken()` / `setToken(token: string)`
- `getAdminUsername()` / `setAdminUsername(username: string)`
- `get<T>(key: string)` / `set<T>(key: string, value: T)`
- `remove(key: string)`
- `clearAll()`

---

### 2. **LoggerService** - Environment-Aware Logging
Located: `src/app/services/logger.service.ts`

**Before:**
```typescript
console.log('User logged in:', user);
console.debug('[Component] Data loaded');
```

**After:**
```typescript
constructor(private logger: LoggerService) {}

this.logger.log('User logged in:', user);
this.logger.debug('[Component] Data loaded');
```

**Benefits:**
- Automatically disabled in production (except errors)
- Consistent logging across the app
- Easy to extend with remote logging

**Available Methods:**
- `log(...args)` - General logging (dev only)
- `error(...args)` - Error logging (always on)
- `warn(...args)` - Warnings (dev only)
- `debug(...args)` - Debug info (dev only)
- `info(...args)` - Info messages (dev only)

---

### 3. **GlobalErrorHandler** - Centralized Error Handling
Located: `src/app/services/global-error-handler.service.ts`

**Automatically registered in `app.config.ts`**

**What it does:**
- Catches all uncaught errors in the application
- Provides user-friendly error messages
- Logs detailed error information
- Handles HTTP errors with specific status codes

**Error Messages:**
- `401` - Session expired
- `403` - Permission denied
- `404` - Resource not found
- `500+` - Server error
- `0` - Network/connection error

---

### 4. **Storage Constants** - No More Magic Strings
Located: `src/app/shared/constants/storage.constants.ts`

**Before:**
```typescript
localStorage.getItem('laundryId'); // Typo risk!
localStorage.getItem('laundry_Id'); // Inconsistent!
```

**After:**
```typescript
import { STORAGE_KEYS } from '../shared/constants/storage.constants';

localStorage.getItem(STORAGE_KEYS.LAUNDRY_ID); // Type-safe!
```

**Available Constants:**
```typescript
STORAGE_KEYS.LAUNDRY_ID      // 'laundry_Id'
STORAGE_KEYS.USER_ID         // 'userId'
STORAGE_KEYS.TOKEN           // 'token'
STORAGE_KEYS.ADMIN_USERNAME  // 'adminUsername'
```

---

### 5. **Order Status Constants** - Type-Safe Status Checks
Located: `src/app/shared/constants/order-status.constants.ts`

**Before:**
```typescript
if (order.status === 'finished processing') { } // Error-prone!
if (order.status === 'Finished Processing') { } // Case mismatch!
```

**After:**
```typescript
import { OrderStatus } from '../shared/constants/order-status.constants';

if (order.status === OrderStatus.FINISHED_PROCESSING) { }
```

**Available Status:**
```typescript
OrderStatus.ORDER_PLACED           // 'order placed'
OrderStatus.PICKED_UP             // 'order picked up'
OrderStatus.FINISHED_PROCESSING   // 'finished processing'
OrderStatus.DELIVERED             // 'delivered'
```

---

### 6. **Pagination Utilities** - Reusable Pagination Logic
Located: `src/app/shared/utils/pagination.util.ts`

**Before:**
```typescript
// Duplicated in every component
get paginatedOrders() {
  const start = (this.page - 1) * this.pageSize;
  return this.orders.slice(start, start + this.pageSize);
}

get totalPages() {
  return Math.ceil(this.orders.length / this.pageSize) || 1;
}
```

**After:**
```typescript
import { paginate, calculateTotalPages } from '../shared/utils/pagination.util';

get paginatedOrders() {
  return paginate(this.orders, this.currentPage, this.pageSize);
}

get totalPages() {
  return calculateTotalPages(this.orders.length, this.pageSize);
}
```

---

## 🔄 Migration Examples

### Example 1: Refactor a Component Using LocalStorage

**Before:**
```typescript
export class LaundryComponent {
  laundryId: string | null = null;

  ngOnInit() {
    this.laundryId = localStorage.getItem('laundryId');
    const userId = localStorage.getItem('userId');
  }

  saveData() {
    localStorage.setItem('laundryId', this.laundryId);
  }
}
```

**After:**
```typescript
import { StorageService } from '../services/storage.service';

export class LaundryComponent {
  laundryId: string | null = null;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.laundryId = this.storage.getLaundryId();
    const userId = this.storage.getUserId();
  }

  saveData() {
    this.storage.setLaundryId(this.laundryId);
  }
}
```

---

### Example 2: Replace Console Logs

**Before:**
```typescript
export class OrderService {
  getOrders() {
    console.log('Fetching orders...');
    return this.http.get('/api/orders').pipe(
      tap(data => console.log('Orders received:', data)),
      catchError(err => {
        console.error('Error fetching orders:', err);
        return throwError(err);
      })
    );
  }
}
```

**After:**
```typescript
import { LoggerService } from '../services/logger.service';

export class OrderService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getOrders() {
    this.logger.log('Fetching orders...');
    return this.http.get('/api/orders').pipe(
      tap(data => this.logger.log('Orders received:', data)),
      catchError(err => {
        this.logger.error('Error fetching orders:', err);
        return throwError(() => err);
      })
    );
  }
}
```

---

### Example 3: Use Order Status Constants

**Before:**
```typescript
export class OrderComponent {
  isFinished(order: Order): boolean {
    return order.status?.trim().toLowerCase() === 'finished processing';
  }

  isDelivered(order: Order): boolean {
    return order.status === 'delivered';
  }
}
```

**After:**
```typescript
import { OrderStatus } from '../shared/constants/order-status.constants';

export class OrderComponent {
  isFinished(order: Order): boolean {
    return order.status === OrderStatus.FINISHED_PROCESSING;
  }

  isDelivered(order: Order): boolean {
    return order.status === OrderStatus.DELIVERED;
  }
}
```

---

### Example 4: Simplify Pagination

**Before:**
```typescript
export class CustomersComponent {
  customers: Customer[] = [];
  currentPage = 1;
  pageSize = 10;

  get paginatedCustomers(): Customer[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.customers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.customers.length / this.pageSize) || 1;
  }
}
```

**After:**
```typescript
import { paginate, calculateTotalPages } from '../shared/utils/pagination.util';

export class CustomersComponent {
  customers: Customer[] = [];
  currentPage = 1;
  pageSize = 10;

  get paginatedCustomers(): Customer[] {
    return paginate(this.customers, this.currentPage, this.pageSize);
  }

  get totalPages(): number {
    return calculateTotalPages(this.customers.length, this.pageSize);
  }
}
```

---

## ✅ Benefits Summary

1. **Type Safety** - Fewer runtime errors with constants and TypeScript
2. **Maintainability** - Change once, update everywhere
3. **Consistency** - Uniform patterns across the codebase
4. **Testability** - Easier to mock services
5. **Production Ready** - Automatic logging control based on environment
6. **Error Tracking** - Centralized error handling for better monitoring

---

## 🚀 Next Steps

1. ✅ Services created and registered
2. ⏳ Gradually refactor components to use new services
3. ⏳ Replace `console.log` with `LoggerService`
4. ⏳ Replace `localStorage` with `StorageService`
5. ⏳ Replace magic strings with constants
6. ⏳ Use pagination utilities
7. ⏳ Remove commented-out code
8. ⏳ Add unit tests for services

---

## 📝 Notes

- All new services are automatically available via dependency injection
- No need to add to `providers` array (using `providedIn: 'root'`)
- LoggerService automatically respects environment settings
- GlobalErrorHandler is globally registered and catches all errors
