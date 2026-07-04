import { NextResponse } from "next/server";
import { Resend } from "resend";

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
  source?: string;
};

const leadRecipientEmail =
  process.env.LEADS_TO_EMAIL ?? "soporte@craghilladvisory.com";
const leadFromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Craghill Advisory <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(lead: LeadInsert) {
  const rows = [
    ["Nombre", lead.full_name],
    ["Correo", lead.email],
    ["Teléfono", lead.phone ?? "No indicado"],
    ["Servicio de interés", lead.service_interest ?? "No indicado"],
    ["Etapa del negocio", lead.company_stage ?? "No indicada"],
    ["Mensaje", lead.message ?? "Sin mensaje adicional"],
    ["Origen", lead.source],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #4d5669; line-height: 1.6;">
      <h1 style="color: #10c7d4; font-size: 24px;">Nuevo lead de Craghill Advisory</h1>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 10px; border: 1px solid #d7eef1; font-weight: 700; width: 180px;">${label}</td>
                <td style="padding: 10px; border: 1px solid #d7eef1;">${escapeHtml(String(value)).replace(/\n/g, "<br />")}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

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
    source: payload.source?.trim() || "landing",
  };

  let emailSent = false;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: leadFromEmail,
      to: leadRecipientEmail,
      replyTo: lead.email,
      subject: `Nuevo lead: ${lead.full_name}`,
      html: buildEmailHtml(lead),
    });

    if (error) {
      return NextResponse.json(
        { error: "No pudimos enviar el correo. Intenta de nuevo." },
        { status: 500 }
      );
    }

    emailSent = true;
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      emailSent,
      message: emailSent
        ? "Gracias. Recibimos tu información y te contactaremos pronto."
        : "Formulario recibido en modo demo. Configura RESEND_API_KEY para enviarlo por correo.",
    });
  }

  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    if (emailSent) {
      return NextResponse.json({
        ok: true,
        configured: false,
        emailSent,
        message: "Gracias. Recibimos tu información y te contactaremos pronto.",
      });
    }

    return NextResponse.json(
      { error: "No pudimos guardar el formulario. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    emailSent,
    message: emailSent
      ? "Gracias. Recibimos tu información y te contactaremos pronto."
      : "Formulario guardado. Configura RESEND_API_KEY para enviarlo por correo.",
  });
}
