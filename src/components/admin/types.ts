export type LeadStatus = "new" | "contacted" | "negotiation" | "closed" | "lost";

export type LeadSource = 
  | "diesel_ebook" 
  | "smartdrill_trial" 
  | "newsletter" 
  | "website" 
  | "contact_form"
  | "demo_request";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
  // Extended fields for CRM
  score: number;
  status: LeadStatus;
  last_activity: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  action: string;
  timestamp: string;
  details?: string;
}

export type TopicCategory = "drilling" | "blasting" | "ia" | "diesel";

export interface TopicInterest {
  topic: TopicCategory;
  count: number;
  percentage: number;
}

export interface FunnelStep {
  name: string;
  count: number;
  dropoff: number;
}
