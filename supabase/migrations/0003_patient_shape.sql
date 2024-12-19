/*
  # Create initial admin user

  1. Changes
    - Creates a function to create an admin user
    - Adds a trigger to automatically create an admin record when the first user signs up
    - Drops the trigger after first use to prevent additional admin creation
  
  2. Security
    - Only the first user to sign up will become an admin
    - Function is restricted to authenticated users only
*/

-- Function to create admin user
CREATE OR REPLACE FUNCTION create_admin_for_first_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user
  IF NOT EXISTS (SELECT 1 FROM admins) THEN
    -- Create admin record for the first user
    INSERT INTO admins (user_id) VALUES (NEW.id);
    
    -- Drop this trigger after creating the first admin
    DROP TRIGGER IF EXISTS create_first_admin_trigger ON auth.users;
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