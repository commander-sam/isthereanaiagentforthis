-- Create feature requests table
CREATE TABLE feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  agent_url text NOT NULL,
  description text NOT NULL,
  unique_value text NOT NULL,
  metrics text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Add constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_url CHECK (agent_url ~* '^https?://.*$')
);

-- Enable RLS
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit feature requests"
  ON feature_requests
  FOR INSERT
  TO public
  WITH CHECK (status = 'pending');

CREATE POLICY "Users can view their own requests"
  ON feature_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Admins can manage all requests"
  ON feature_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON feature_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();