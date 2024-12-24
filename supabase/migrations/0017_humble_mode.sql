-- Insert or update categories
INSERT INTO categories (id, name, description, icon)
VALUES
  ('chatbots', 'Chatbots', 'Conversational AI agents for various purposes', 'MessageSquare'),
  ('automation', 'Automation', 'AI agents that automate tasks and workflows', 'Cog'),
  ('research', 'Research', 'AI agents for research and analysis', 'Search'),
  ('coding', 'Coding', 'AI agents for programming assistance', 'Code'),
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