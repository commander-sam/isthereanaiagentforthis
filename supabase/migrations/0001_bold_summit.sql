/*
  # Create admins table and RLS policies

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `admins` table
    - Add policy for authenticated users to read their own admin status
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own admin status"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);