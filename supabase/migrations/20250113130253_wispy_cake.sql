-- First ensure the category column exists in agents table
ALTER TABLE agents
  DROP CONSTRAINT IF EXISTS agents_category_fkey,
  ALTER COLUMN category TYPE text;

-- Add foreign key constraint
ALTER TABLE agents
  ADD CONSTRAINT agents_category_fkey
  FOREIGN KEY (category)
  REFERENCES categories(id)
  ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS agents_category_idx ON agents(category);