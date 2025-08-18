import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  status: "pending" | "confirmed" | "cancelled";
  message?: string;
  created_at: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  is_available: boolean;
}
