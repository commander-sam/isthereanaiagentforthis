-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;

-- Create new policy for public access
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  USING (true);

-- Ensure RLS is still enabled
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;