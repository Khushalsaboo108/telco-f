export interface OrderNotes {
  courseId: string;
  userId: string;
}

export interface IRazorpayOrderOptions {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: OrderNotes;
  offer_id: string | null;
  receipt: string;
  status: string;
}
