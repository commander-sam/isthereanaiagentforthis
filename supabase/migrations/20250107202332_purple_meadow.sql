/*
  # Blog System Schema

  1. New Tables
    - `blog_posts`
      - Core post data including title, content, status
      - Support for drafts and scheduling
    - `blog_categories`
      - Categories for organizing posts
    - `blog_tags`
      - Tags for additional post classification
    - `blog_post_tags`
      - Junction table for post-tag relationships
    - `blog_comments`
      - User comments on posts
  
  2. Security
    - RLS enabled on all tables
    - Policies for public reading of published posts
    - Admin-only write access
*/

-- Create blog post status enum
CREATE TYPE blog_post_status AS ENUM ('draft', 'published', 'archived');

-- Create blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  status blog_post_status NOT NULL DEFAULT 'draft',
  category_id text REFERENCES categories(id),
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  view_count bigint DEFAULT 0,
  
  CONSTRAINT valid_featured_image CHECK (featured_image ~* '^https?://.*$')
);

-- Create tags table
CREATE TABLE blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create posts_tags junction table
CREATE TABLE blog_post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create comments table
CREATE TABLE blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  parent_id uuid REFERENCES blog_comments(id),
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published' AND published_at <= now());

CREATE POLICY "Authors can view their own drafts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view tags"
  ON blog_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view post tags"
  ON blog_post_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage post tags"
  ON blog_post_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view approved comments"
  ON blog_comments
  FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Users can create comments"
  ON blog_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their comments"
  ON blog_comments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all comments"
  ON blog_comments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX blog_tags_slug_idx ON blog_tags(slug);
CREATE INDEX blog_comments_post_id_idx ON blog_comments(post_id);

-- Add full-text search
ALTER TABLE blog_posts 
  ADD COLUMN search_vector tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

CREATE INDEX blog_posts_search_idx ON blog_posts USING GIN (search_vector);