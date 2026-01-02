-- Create table for lead notes and follow-ups
CREATE TABLE public.lead_notes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    note_type TEXT NOT NULL DEFAULT 'note', -- 'note', 'follow_up', 'call', 'email', 'meeting'
    follow_up_date TIMESTAMP WITH TIME ZONE,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- RLS policies - only admins can manage notes
CREATE POLICY "Admins can view all notes"
ON public.lead_notes
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert notes"
ON public.lead_notes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update notes"
ON public.lead_notes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete notes"
ON public.lead_notes
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_lead_notes_updated_at
BEFORE UPDATE ON public.lead_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for sales goals
CREATE TABLE public.sales_goals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    leads_goal INTEGER NOT NULL DEFAULT 0,
    conversions_goal INTEGER NOT NULL DEFAULT 0,
    revenue_goal NUMERIC(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(month, year)
);

-- Enable RLS
ALTER TABLE public.sales_goals ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can view sales goals"
ON public.sales_goals
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage sales goals"
ON public.sales_goals
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_sales_goals_updated_at
BEFORE UPDATE ON public.sales_goals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();