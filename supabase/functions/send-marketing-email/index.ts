import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Attachment {
  filename: string;
  content: string; // base64 encoded
  contentType: string;
}

interface EmailRequest {
  recipients: string[];
  subject: string;
  htmlContent: string;
  attachments?: Attachment[];
}

interface ResendEmailPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string;
    content_type?: string;
  }>;
}

async function sendEmailViaResend(payload: ResendEmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }
  
  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipients, subject, htmlContent, attachments }: EmailRequest = await req.json();

    if (!recipients || recipients.length === 0) {
      throw new Error("No recipients provided");
    }

    if (!subject || !htmlContent) {
      throw new Error("Subject and content are required");
    }

    const results = [];
    const errors = [];

    // Prepare attachments for Resend (base64 content is passed directly)
    const resendAttachments = attachments?.map((att) => ({
      filename: att.filename,
      content: att.content, // base64 string
      content_type: att.contentType,
    }));

    // Send emails in batches to avoid rate limits
    for (const email of recipients) {
      try {
        const emailPayload: ResendEmailPayload = {
          from: "Minerattum <onboarding@resend.dev>",
          to: [email],
          subject: subject,
          html: htmlContent,
        };

        if (resendAttachments && resendAttachments.length > 0) {
          emailPayload.attachments = resendAttachments;
        }

        const emailResponse = await sendEmailViaResend(emailPayload);
        results.push({ email, success: true, id: emailResponse.id });
      } catch (error: any) {
        console.error(`Error sending to ${email}:`, error);
        errors.push({ email, error: error.message });
      }
    }

    console.log(`Emails sent: ${results.length}, Errors: ${errors.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: results.length,
        failed: errors.length,
        results,
        errors,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-marketing-email function:", error);
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
