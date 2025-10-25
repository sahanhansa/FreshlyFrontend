export interface Feedback {
  feedbackId: number;
  customerId: number;
  description: string;
  rating: number;
  laundryId: number;
  customerName?: string;
  laundryName?: string;
  region?: string;
}