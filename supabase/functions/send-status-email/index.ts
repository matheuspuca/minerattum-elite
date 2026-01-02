import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface StatusEmailRequest {
  leadEmail: string;
  leadName: string;
  oldStatus: string;
  newStatus: string;
}

const STATUS_MESSAGES: Record<string, { subject: string; message: string }> = {
  contacted: {
    subject: "Recebemos seu contato - Minerattum",
    message: "Nossa equipe recebeu sua mensagem e entrou em contato. Em breve você receberá mais informações.",
  },
  qualified: {
    subject: "Você foi qualificado! - Minerattum",
    message: "Parabéns! Após análise do seu perfil, identificamos que podemos ajudá-lo com nossas soluções. Nossa equipe entrará em contato para agendar uma demonstração.",
  },
  proposal: {
    subject: "Proposta comercial - Minerattum",
    message: "Preparamos uma proposta personalizada para você. Nossa equipe entrará em contato para apresentar os detalhes e esclarecer qualquer dúvida.",
  },
  closed: {
    subject: "Bem-vindo à Minerattum! 🎉",
    message: "É com grande prazer que confirmamos sua parceria conosco! Você agora faz parte da família Minerattum. Nossa equipe de sucesso do cliente entrará em contato para o processo de onboarding.",
  },
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-status-email function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadEmail, leadName, oldStatus, newStatus }: StatusEmailRequest = await req.json();
    console.log(`Status change: ${oldStatus} -> ${newStatus} for ${leadEmail}`);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("RESEND_API_KEY not configured");
    }

    // Check if we should send email for this status
    const statusConfig = STATUS_MESSAGES[newStatus];
    if (!statusConfig) {
      console.log(`No email configured for status: ${newStatus}`);
      return new Response(
        JSON.stringify({ success: true, message: "No email for this status" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailPayload = {
      from: "Minerattum <contato@minerattum.com>",
      to: [leadEmail],
      subject: statusConfig.subject,
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
            .cta-button { display: inline-block; padding: 12px 24px; background: #1e40af; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">${statusConfig.subject.replace(' - Minerattum', '')}</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${leadName}</strong>,</p>
              <p>${statusConfig.message}</p>
              <p>Precisa de algo? Entre em contato conosco!</p>
              <center>
                <a href="https://minerattum.com" class="cta-button">Visite nosso site</a>
              </center>
              <p style="margin-top: 30px;">Atenciosamente,<br><strong>Equipe Minerattum</strong></p>
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

    console.log("Sending status email to:", leadEmail);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();
    console.log("Resend API response:", JSON.stringify(responseData));

    if (!response.ok) {
      console.error("Resend API error:", responseData);
      throw new Error(responseData.message || "Failed to send status email");
    }

    return new Response(
      JSON.stringify({ success: true, emailId: responseData.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-status-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
