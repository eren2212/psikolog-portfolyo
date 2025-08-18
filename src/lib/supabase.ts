import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
};

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
  created_by_admin?: boolean;
  created_at: string;
}

export interface BlockedPeriod {
  id: string;
  start_date: string;
  end_date: string;
  reason?: string;
  block_type: "holiday" | "meeting" | "personal" | "unavailable";
  created_at: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  is_available: boolean;
}
