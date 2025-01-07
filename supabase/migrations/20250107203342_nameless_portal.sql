/*
  # Add Sample Blog Data

  1. Changes
    - Insert initial blog tags
    - Insert sample blog post
    - Link tags to post
*/

-- Insert sample tags
INSERT INTO blog_tags (id, name, slug) VALUES
  ('c47f3c1c-a79b-4147-9bba-7b8471a45382', 'AI News', 'ai-news'),
  ('d58e4c2d-b89c-4247-acba-8b9481a45493', 'Technology', 'technology')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (
  id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  status,
  category_id,
  author_id,
  published_at
) VALUES (
  'e69f5c3e-c89d-4347-bcba-9b9491a45594',
  'The Future of AI Agents in 2024',
  'future-of-ai-agents-2024',
  'Explore the exciting developments and trends shaping the future of AI agents in 2024 and beyond.',
  '<h2>The Evolution of AI Agents</h2>
   <p>As we enter 2024, artificial intelligence continues to evolve at an unprecedented pace. AI agents are becoming increasingly sophisticated, capable of handling complex tasks and interactions that were once the exclusive domain of human operators.</p>
   
   <h3>Key Trends</h3>
   <ul>
     <li>Enhanced Natural Language Processing</li>
     <li>Improved Context Understanding</li>
     <li>Better Multi-modal Capabilities</li>
     <li>Increased Automation Potential</li>
   </ul>
   
   <h3>Impact on Industries</h3>
   <p>The rise of AI agents is transforming various sectors, from customer service to healthcare. Organizations are discovering new ways to leverage these technologies to improve efficiency and deliver better experiences.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=600',
  'published',
  'chatbots',
  (SELECT user_id FROM admins LIMIT 1),
  NOW()
);

-- Link tags to the post
INSERT INTO blog_post_tags (post_id, tag_id) VALUES
  ('e69f5c3e-c89d-4347-bcba-9b9491a45594', 'c47f3c1c-a79b-4147-9bba-7b8471a45382'),
  ('e69f5c3e-c89d-4347-bcba-9b9491a45594', 'd58e4c2d-b89c-4247-acba-8b9481a45493');