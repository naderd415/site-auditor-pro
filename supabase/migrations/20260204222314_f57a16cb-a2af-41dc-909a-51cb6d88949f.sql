-- Create site_config table to store admin settings globally
CREATE TABLE public.site_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  config JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read config (for displaying ads, etc.)
CREATE POLICY "Anyone can read site config" 
ON public.site_config 
FOR SELECT 
USING (true);

-- Only admins can update config
CREATE POLICY "Admins can update site config" 
ON public.site_config 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can insert config
CREATE POLICY "Admins can insert site config" 
ON public.site_config 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Insert default config row
INSERT INTO public.site_config (id, config) VALUES ('main', '{}');

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_site_config_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_config_updated_at
BEFORE UPDATE ON public.site_config
FOR EACH ROW
EXECUTE FUNCTION public.update_site_config_timestamp();