export interface AdminStats {
  totalPickups: number;
  totalDeliveries: number;
  totalHours: number;
  totalRevenue: number;
  activeUsers: number;
}

export interface AdminPanelMember {
  id: number;
  name: string;
  fullName?: string;
  role: string;
  image: string;
  email: string;
}

export interface Laundry {
  id: number;
  name: string;
  logo: string;
  rating: number;
  location: string;
}

export interface Driver {
  id: number;
  name: string;
  photo: string;
  rating: number;
  location: string;
  email: string;
  accountStatus?: string;
}

export interface PendingAction {
  count: number;
  type: 'pickup' | 'delivery';
} 