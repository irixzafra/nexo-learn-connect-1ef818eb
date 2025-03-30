
export interface PaymentMethod {
  id: string;
  user_id: string;
  stripe_payment_method_id: string;
  card_brand: string | null;
  card_last4: string | null;
  card_exp_month: number | null;
  card_exp_year: number | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  subscription_id: string | null;
  course_id: string | null;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  stripe_invoice_id: string | null;
  invoice_url: string | null;
  pdf_url: string | null;
  created_at: string;
  paid_at: string | null;
  course?: {
    title: string;
  };
  subscription?: {
    subscription_plans: {
      name: string;
    };
  };
}
