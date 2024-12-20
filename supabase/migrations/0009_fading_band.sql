/*
  # Simplify admin authentication

  1. Changes
    - Remove automatic admin creation trigger
    - Keep core admins table and policies
    - Maintain RLS security

  2. Security
    - Preserve existing RLS policies for admin access
    - Keep table structure secure
*/

-- Drop the automatic admin creation trigger and function
DROP TRIGGER IF EXISTS create_first_admin_trigger ON auth.users;
DROP FUNCTION IF EXISTS create_admin_for_first_user();

-- Ensure policies are correctly set
DROP POLICY IF EXISTS "Users can read their own admin status" ON "admins";
DROP POLICY IF EXISTS "Admins can manage other admins" ON "admins";

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