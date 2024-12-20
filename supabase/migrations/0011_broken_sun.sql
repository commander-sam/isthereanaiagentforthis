/*
  # Create Agents Schema

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, required)
      - `short_description` (text, required)
      - `image_url` (text, required)
      - `category` (text, required)
      - `url` (text, required)
      - `featured` (boolean, default false)
      - `status` (enum, required)
      - `source` (enum, required)
      - `pricing` (enum, required)
      - `contact_email` (text, required)
      - `github_url` (text)
      - `twitter_url` (text)
      - `facebook_url` (text)
      - `linkedin_url` (text)
      - `discord_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `submitted_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on agents table
    - Add policies for:
      - Public read access for approved agents
      - Authenticated users can submit new agents
      - Admins can manage all agents
*/

-- Create enums for agent status, source, and pricing
CREATE TYPE agent_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE agent_source AS ENUM ('open_source', 'closed_source');
CREATE TYPE agent_pricing AS ENUM ('free', 'freemium', 'paid');

-- Create agents table
CREATE TABLE agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  featured boolean DEFAULT false,
  status agent_status NOT NULL DEFAULT 'pending',
  source agent_source NOT NULL,
  pricing agent_pricing NOT NULL,
  contact_email text NOT NULL,
  github_url text,
  twitter_url text,
  facebook_url text,
  linkedin_url text,
  discord_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  submitted_by uuid REFERENCES auth.users,
  
  -- Add constraints
  CONSTRAINT valid_email CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_url CHECK (url ~* '^https?://.*$')
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view approved agents"
  ON agents
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authenticated users can submit agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = submitted_by AND
    status = 'pending'
  );

CREATE POLICY "Users can view their own submissions"
  ON agents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = submitted_by);

CREATE POLICY "Users can update their pending submissions"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = submitted_by AND
    status = 'pending'
  )
  WITH CHECK (
    status = 'pending'
  );

CREATE POLICY "Admins can manage all agents"
  ON agents
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );