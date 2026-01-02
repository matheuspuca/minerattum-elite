import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-new-lead function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadNotificationRequest = await req.json();
    console.log("Lead data received:", JSON.stringify(leadData));

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("RESEND_API_KEY not configured");
    }

    // Send notification to commercial email
    const notificationEmail = {
      from: "Minerattum Site <onboarding@resend.dev>",
      to: ["comercial@minerattum.com"],
      subject: `🔔 Novo Lead: ${leadData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
            .footer { padding: 15px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 Novo Lead Recebido!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Via formulário do site</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">${leadData.name}</div>
              </div>
              <div class="field">
                <div class="label">📧 E-mail:</div>
                <div class="value"><a href="mailto:${leadData.email}">${leadData.email}</a></div>
              </div>
              ${leadData.company ? `
              <div class="field">
                <div class="label">🏢 Empresa:</div>
                <div class="value">${leadData.company}</div>
              </div>
              ` : ''}
              ${leadData.phone ? `
              <div class="field">
                <div class="label">📱 Telefone:</div>
                <div class="value"><a href="tel:${leadData.phone}">${leadData.phone}</a></div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">💬 Mensagem:</div>
                <div class="value">${leadData.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este email foi enviado automaticamente pelo sistema Minerattum.</p>
              <p>Acesse o painel admin para gerenciar este lead.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log("Sending notification email to comercial@minerattum.com");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(notificationEmail),
    });

    const responseData = await response.json();
    console.log("Resend API response:", JSON.stringify(responseData));

    if (!response.ok) {
      console.error("Resend API error:", responseData);
      throw new Error(responseData.message || "Failed to send notification email");
    }

    // Also send confirmation email to the lead
    const confirmationEmail = {
      from: "Minerattum <onboarding@resend.dev>",
      to: [leadData.email],
      subject: "Recebemos sua mensagem - Minerattum",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Obrigado pelo contato!</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${leadData.name}</strong>,</p>
              <p>Recebemos sua mensagem e nossa equipe entrará em contato em breve.</p>
              <p>Enquanto isso, conheça mais sobre nossas soluções:</p>
              <ul>
                <li><strong>SmartDrill:</strong> SaaS de gestão de perfuração de rochas</li>
                <li><strong>Consultoria:</strong> Otimização de operações de mineração</li>
                <li><strong>Academia:</strong> E-books e cursos especializados</li>
              </ul>
              <p>Atenciosamente,<br><strong>Equipe Minerattum</strong></p>
            </div>
            <div class="footer">
              <p>Minerattum - Tecnologia para Mineração</p>
              <p><a href="https://minerattum.com">minerattum.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log("Sending confirmation email to lead:", leadData.email);

    const confirmResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(confirmationEmail),
    });

    const confirmData = await confirmResponse.json();
    console.log("Confirmation email response:", JSON.stringify(confirmData));

    return new Response(
      JSON.stringify({
        success: true,
        notificationId: responseData.id,
        confirmationId: confirmData.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-new-lead function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
