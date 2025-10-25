/**
 * Interface representing a Laundry for admin operations
 * Maps to the backend LaundryAdminDTO with automatic camelCase conversion
 */
export interface LaundryAdminDTO {
  // Basic laundry info
  laundryId: string;
  laundryName: string;
  username: string;
  email: string;
  
  // Owner info
  ownerId: string | null;
  ownerName: string | null;
  
  // Address info
  fullAddress: string | null;
  
  // Statistics
  averageRating: number;
  totalOrders: number;
  feedbackCount: number;
  
  // Authentication - only used for creation
  password?: string; 

  // Account status
  accountStatus?: string | null;
  // Profile picture URL
  profilePic?: string | null;
}
