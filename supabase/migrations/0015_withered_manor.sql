/*
  # Add Search Indexes and Categories

  1. Enable Extensions
    - Enable pg_trgm for text search capabilities
  
  2. Add Indexes
    - Add text search indexes on agents table
    - Add index on categories name
  
  3. Add Categories
    - Add new categories for better organization
    - Ensure RLS policies exist
*/

-- First enable the pg_trgm extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create indexes for text search
CREATE INDEX IF NOT EXISTS agents_name_search_idx ON agents USING GiST (name gist_trgm_ops);
CREATE INDEX IF NOT EXISTS agents_short_description_search_idx ON agents USING GiST (short_description gist_trgm_ops);
CREATE INDEX IF NOT EXISTS agents_description_search_idx ON agents USING GiST (description gist_trgm_ops);

-- Add index on categories
CREATE INDEX IF NOT EXISTS categories_name_idx ON categories(name);

-- Ensure RLS is enabled
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for categories if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'categories' 
    AND policyname = 'Anyone can view categories'
  ) THEN
    CREATE POLICY "Anyone can view categories"
      ON categories
      FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'categories' 
    AND policyname = 'Admins can manage categories'
  ) THEN
    CREATE POLICY "Admins can manage categories"
      ON categories
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admins WHERE user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Add more categories
INSERT INTO categories (id, name, description, icon)
VALUES
  ('data-analysis', 'Data Analysis', 'AI tools for analyzing and visualizing data', 'BarChart'),
  ('image-generation', 'Image Generation', 'AI tools for creating and editing images', 'Image'),
  ('writing', 'Writing', 'AI tools for content creation and editing', 'Edit'),
  ('translation', 'Translation', 'AI tools for language translation', 'Languages'),
  ('audio', 'Audio', 'AI tools for audio processing and generation', 'Music')
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;