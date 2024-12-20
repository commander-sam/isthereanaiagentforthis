/*
  # Fix admins table structure

  1. Actions
    - Drop and recreate admins table with correct structure
    - Re-enable RLS and policies
    - Ensure trigger function exists

  2. Security
    - Enable RLS
    - Recreate policies for admin access
*/

-- Drop existing table and related objects
DROP TABLE IF EXISTS admins CASCADE;

-- Create the admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own admin status"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage other admins"
  ON admins
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

-- Recreate trigger function
CREATE OR REPLACE FUNCTION create_admin_for_first_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM admins) THEN
    INSERT INTO admins (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS create_first_admin_trigger ON auth.users;
CREATE TRIGGER create_first_admin_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_for_first_user();