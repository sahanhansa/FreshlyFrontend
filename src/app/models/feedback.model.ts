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

export interface FeedbackDTO {
  feedbackId?: string;
  description: string;
  rating: number;
  orderId: string;
  laundryId: string;
  submittedByType: string;
}

export interface FeedbackRequest {
  description: string;
  rating: number;
  orderId: string;
  laundryId?: string;
}
