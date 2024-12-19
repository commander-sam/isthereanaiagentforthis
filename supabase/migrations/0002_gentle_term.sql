/*
  # Admin Security Policies

  This migration adds additional security policies for the admins table.

  1. Security
    - Add policies for admins to manage other admins
    - Ensure only authenticated users can access their own admin status
*/

DO $$ BEGIN
  -- Only create policy if it doesn't exist
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
END $$;

-- Add policy for admins to manage other admins
CREATE POLICY "Admins can manage other admins"
  ON admins
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );