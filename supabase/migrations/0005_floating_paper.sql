/*
  # Fix admin setup and policies

  1. Cleanup
    - Safely drops and recreates trigger if exists
    - Ensures consistent policy setup
  2. Security
    - Verifies RLS is enabled
    - Ensures all required policies exist
*/

-- Ensure trigger function exists and is up to date
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

-- Recreate trigger to ensure it's properly connected
DROP TRIGGER IF EXISTS create_first_admin_trigger ON auth.users;
CREATE TRIGGER create_first_admin_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_admin_for_first_user();

-- Verify RLS is enabled
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Ensure policies exist with correct permissions
DO $$ 
BEGIN
  -- Drop existing policies to ensure clean state
  DROP POLICY IF EXISTS "Users can read their own admin status" ON admins;
  DROP POLICY IF EXISTS "Admins can manage other admins" ON admins;
  
  -- Recreate policies with correct permissions
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
END $$;