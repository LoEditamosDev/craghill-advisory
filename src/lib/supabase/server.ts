import { createClient } from "@supabase/supabase-js";

export type LeadInsert = {
  full_name: string;
  email: string;
  phone?: string | null;
  company_stage?: string | null;
  service_interest?: string | null;
  message?: string | null;
  source?: string;
};

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}
