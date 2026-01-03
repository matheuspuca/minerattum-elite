-- Create settings table for storing all admin configurations
CREATE TABLE public.settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  category text NOT NULL DEFAULT 'general',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Only admins can view settings
CREATE POLICY "Admins can view settings" 
ON public.settings 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert settings
CREATE POLICY "Admins can insert settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update settings
CREATE POLICY "Admins can update settings" 
ON public.settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete settings
CREATE POLICY "Admins can delete settings" 
ON public.settings 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create unique index on key for upsert operations
CREATE UNIQUE INDEX idx_settings_key ON public.settings(key);

-- Insert default settings
INSERT INTO public.settings (key, value, category) VALUES
('company', '{"name": "Minerattum", "email": "contato@minerattum.com", "phone": "(11) 99999-9999", "website": "https://minerattum.com", "address": "São Paulo, SP - Brasil", "cnpj": "", "socialLinkedin": "", "socialInstagram": "", "socialFacebook": ""}', 'company'),
('email', '{"senderName": "Minerattum", "senderEmail": "contato@minerattum.com", "replyTo": "contato@minerattum.com", "signature": "Atenciosamente,\nEquipe Minerattum", "autoResponder": true, "dailyDigest": true, "newLeadNotification": true, "statusChangeNotification": true}', 'email'),
('integrations', '{"googleAnalyticsId": "", "facebookPixelId": "", "whatsappNumber": "", "whatsappApiKey": "", "zapierWebhook": "", "slackWebhook": ""}', 'integrations'),
('notifications', '{"emailOnNewLead": true, "emailOnStatusChange": true, "emailDailyDigest": false, "browserNotifications": true, "slackNotifications": false, "whatsappNotifications": false}', 'notifications');