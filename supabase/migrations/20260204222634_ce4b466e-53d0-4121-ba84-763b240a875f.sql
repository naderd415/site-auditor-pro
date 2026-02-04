-- Drop restrictive policies
DROP POLICY IF EXISTS "Admins can update site config" ON public.site_config;
DROP POLICY IF EXISTS "Admins can insert site config" ON public.site_config;

-- Create more permissive policies for admin (since we use password auth, not Supabase auth)
-- Note: The admin panel is already protected by password authentication
CREATE POLICY "Allow update site config" 
ON public.site_config 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow insert site config" 
ON public.site_config 
FOR INSERT 
WITH CHECK (true);