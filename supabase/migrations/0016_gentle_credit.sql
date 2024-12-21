/*
  # Add newsletter subscriptions

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamp)
      - `status` (enum: active, unsubscribed)

  2. Security
    - Enable RLS
    - Add policy for public subscription
    - Add policy for admin management
*/

-- Create subscription status enum
CREATE TYPE subscription_status AS ENUM ('active', 'unsubscribed');

-- Create newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz DEFAULT now(),
  status subscription_status DEFAULT 'active',
  
  -- Add email format validation
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow public to subscribe"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (
    status = 'active'
  );

CREATE POLICY "Allow admins to manage subscribers"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

-- Add indexes
CREATE INDEX newsletter_subscribers_email_idx ON newsletter_subscribers(email);
CREATE INDEX newsletter_subscribers_status_idx ON newsletter_subscribers(status);