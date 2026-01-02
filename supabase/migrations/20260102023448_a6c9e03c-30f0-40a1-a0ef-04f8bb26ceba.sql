-- Add score and status columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS score integer DEFAULT 50 CHECK (score >= 0 AND score <= 100),
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiation', 'closed', 'lost')),
ADD COLUMN IF NOT EXISTS last_activity timestamp with time zone DEFAULT now();

-- Create index for better performance on filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_score ON public.leads(score);

-- Update existing leads with random scores for demo purposes
UPDATE public.leads 
SET score = floor(random() * 60 + 40)::integer,
    status = (ARRAY['new', 'contacted', 'negotiation'])[floor(random() * 3 + 1)::integer],
    last_activity = created_at
WHERE score IS NULL;