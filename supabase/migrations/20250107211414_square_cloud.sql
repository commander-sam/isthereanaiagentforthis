-- Create blog categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view blog categories"
  ON blog_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage blog categories"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

-- First, create a new category_id column
ALTER TABLE blog_posts 
  ADD COLUMN new_category_id uuid;

-- Insert default categories and store their IDs
WITH inserted_categories AS (
  INSERT INTO blog_categories (name, slug, description) VALUES
    ('AI News', 'ai-news', 'Latest news and updates from the AI world'),
    ('Tutorials', 'tutorials', 'Step-by-step guides and tutorials'),
    ('Industry Insights', 'industry-insights', 'Analysis and insights about AI industry trends'),
    ('Case Studies', 'case-studies', 'Real-world applications and success stories')
  RETURNING id, slug
)
-- Update the new_category_id column based on matching categories
UPDATE blog_posts
SET new_category_id = (
  SELECT id FROM inserted_categories WHERE slug = 'ai-news' LIMIT 1
);

-- Drop the old foreign key constraint if it exists
ALTER TABLE blog_posts 
  DROP CONSTRAINT IF EXISTS blog_posts_category_id_fkey;

-- Drop the old category_id column
ALTER TABLE blog_posts 
  DROP COLUMN category_id;

-- Rename the new column to category_id
ALTER TABLE blog_posts 
  RENAME COLUMN new_category_id TO category_id;

-- Add the new foreign key constraint
ALTER TABLE blog_posts 
  ADD CONSTRAINT blog_posts_category_id_fkey 
  FOREIGN KEY (category_id) 
  REFERENCES blog_categories(id);