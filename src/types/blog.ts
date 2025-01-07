export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    status: 'draft' | 'published' | 'archived';
    category_id: string;
    author_id: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    view_count: number;
    tags?: BlogTag[];
  }
  
  export interface BlogTag {
    id: string;
    name: string;
    slug: string;
    created_at: string;
  }
  
  export interface BlogComment {
    id: string;
    post_id: string;
    user_id: string;
    parent_id: string | null;
    content: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
  }