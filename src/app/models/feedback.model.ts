export interface Feedback {
  feedbackId: string;
  description?: string;
  rating: number;
  customerId?: string;
  customerName?: string;
  laundryId?: string;
  laundryName?: string;
  isExpanded?: boolean; // For UI expansion state
  customerFName: string;
  customerLName: string;
}


