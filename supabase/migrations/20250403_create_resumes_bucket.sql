
-- Create a storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'Resume Storage', true);

-- Allow anyone to upload resumes (we'll verify in the application)
CREATE POLICY "Public can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read resumes (assuming you want them to be publicly accessible)
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');
