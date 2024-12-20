-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own admin status" ON "admins";
DROP POLICY IF EXISTS "Admins can manage other admins" ON "admins";

-- Create a simpler read policy for all authenticated users
CREATE POLICY "Allow users to read admin status"
  ON "admins"
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a policy for admin management that avoids recursion
CREATE POLICY "Super admins can manage admins"
  ON "admins"
  FOR ALL
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM "admins"
    )
  );