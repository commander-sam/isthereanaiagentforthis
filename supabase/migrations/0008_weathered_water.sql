/*
  # Fix admins table quotes

  1. Changes
    - Update policies to use quoted "admins" table name
    - Preserve existing data and functionality
    - Maintain RLS settings

  2. Security
    - Recreate policies with proper quoting
    - Keep existing security model
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own admin status" ON admins;
DROP POLICY IF EXISTS "Admins can manage other admins" ON admins;

-- Recreate policies with quoted table name
CREATE POLICY "Users can read their own admin status"
  ON "admins"
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage other admins"
  ON "admins"
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "admins" WHERE user_id = auth.uid()
    )
  );

-- Update trigger function to use quoted table name
CREATE OR REPLACE FUNCTION create_admin_for_first_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "admins") THEN
    INSERT INTO "admins" (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;