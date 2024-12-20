/*
  # Update Agents Schema

  1. Add Storage Support
    - Add support for storing agent logos in Supabase Storage
    - Add image processing metadata

  2. Add Categories
    - Add categories table
    - Add category validation to agents table
    - Add category relationships

  3. Add Metrics
    - Add view count tracking
    - Add rating support
*/

-- Create categories table
CREATE TABLE categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add initial categories
INSERT INTO categories (id, name, description, icon) VALUES
  ('chatbots', 'Chatbots', 'Conversational AI agents for various purposes', 'MessageSquare'),
  ('automation', 'Automation', 'AI agents that automate tasks and workflows', 'Cog'),
  ('research', 'Research', 'AI agents for research and analysis', 'Search'),
  ('coding', 'Coding', 'AI agents for programming assistance', 'Code');

-- Add metrics to agents table
ALTER TABLE agents 
  ADD COLUMN view_count bigint DEFAULT 0,
  ADD COLUMN rating_sum bigint DEFAULT 0,
  ADD COLUMN rating_count bigint DEFAULT 0,
  ADD CONSTRAINT category_exists FOREIGN KEY (category) REFERENCES categories(id);

-- Create agent_views table for analytics
CREATE TABLE agent_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES auth.users(id),
  viewed_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Create agent_ratings table
CREATE TABLE agent_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(agent_id, user_id)
);

-- Enable RLS on new tables
ALTER TABLE agent_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for views and ratings
CREATE POLICY "Anyone can create views"
  ON agent_views
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can rate agents"
  ON agent_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own ratings"
  ON agent_ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update agent rating
CREATE OR REPLACE FUNCTION update_agent_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE agents 
    SET rating_sum = rating_sum + NEW.rating,
        rating_count = rating_count + 1
    WHERE id = NEW.agent_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE agents 
    SET rating_sum = rating_sum - OLD.rating + NEW.rating
    WHERE id = NEW.agent_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE agents 
    SET rating_sum = rating_sum - OLD.rating,
        rating_count = rating_count - 1
    WHERE id = OLD.agent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for rating updates
CREATE TRIGGER update_agent_rating_insert
  AFTER INSERT ON agent_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_agent_rating();

CREATE TRIGGER update_agent_rating_update
  AFTER UPDATE ON agent_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_agent_rating();

CREATE TRIGGER update_agent_rating_delete
  AFTER DELETE ON agent_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_agent_rating();