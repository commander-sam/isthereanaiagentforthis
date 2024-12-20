/*
  # Create admins table

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create the admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Recreate policies
DO $$ 
BEGIN
  -- Ensure policies exist
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