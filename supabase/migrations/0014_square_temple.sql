-- Ensure categories table exists
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add initial categories if they don't exist
INSERT INTO categories (id, name, description, icon)
VALUES
  ('chatbots', 'Chatbots', 'Conversational AI agents for various purposes', 'MessageSquare'),
  ('automation', 'Automation', 'AI agents that automate tasks and workflows', 'Cog'),
  ('research', 'Research', 'AI agents for research and analysis', 'Search'),
  ('coding', 'Coding', 'AI agents for programming assistance', 'Code')
ON CONFLICT (id) DO NOTHING;

-- Add policy for admins to manage categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );