-- Create storage bucket for email attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('email-attachments', 'email-attachments', true);

-- Allow admins to upload files to email-attachments bucket
CREATE POLICY "Admins can upload email attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'email-attachments' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to read email attachments
CREATE POLICY "Admins can read email attachments"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'email-attachments' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete email attachments
CREATE POLICY "Admins can delete email attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'email-attachments' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow public read for email attachments (so recipients can view)
CREATE POLICY "Public can view email attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'email-attachments');