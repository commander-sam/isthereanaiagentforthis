/*
  # Add admins table and policies

  1. New Tables
    - Ensures admins table exists
    - Adds policies for admin access
  2. Security
    - Enables RLS
    - Adds policies for admin management
*/

-- Create admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
BEGIN
  -- Create policies if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admins' 
    AND policyname = 'Users can read their own admin status'
  ) THEN
    CREATE POLICY "Users can read their own admin status"
      ON admins
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admins' 
    AND policyname = 'Admins can manage other admins'
  ) THEN
    CREATE POLICY "Admins can manage other admins"
      ON admins
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admins WHERE user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Function to create admin for first user
CREATE OR REPLACE FUNCTION create_admin_for_first_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user
  IF NOT EXISTS (SELECT 1 FROM admins) THEN
    -- Create admin record for the first user
    INSERT INTO admins (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for first user signup
DROP TRIGGER IF EXISTS create_first_admin_trigger ON auth.users;
CREATE TRIGGER create_first_admin_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_for_first_user();