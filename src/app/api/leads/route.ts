import { NextResponse } from "next/server";

import {
  createSupabaseServerClient,
  type LeadInsert,
} from "@/lib/supabase/server";

type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyStage?: string;
  serviceInterest?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  if (!payload.fullName || !payload.email) {
    return NextResponse.json(
      { error: "Nombre y email son obligatorios." },
      { status: 400 }
    );
  }

  const lead: LeadInsert = {
    full_name: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || null,
    company_stage: payload.companyStage?.trim() || null,
    service_interest: payload.serviceInterest?.trim() || null,
    message: payload.message?.trim() || null,
    source: "landing",
  };

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      message: "Formulario recibido en modo demo. Configura Supabase para guardar leads.",
    });
  }

  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    return NextResponse.json(
      { error: "No pudimos guardar el formulario. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, configured: true });
}
