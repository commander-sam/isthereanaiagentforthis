import { MessageSquare, Image, Code, Database, Sparkles, Star } from 'lucide-react';

export const filters = [
  { 
    id: 'all', 
    label: 'All Tools', 
    icon: Sparkles, 
    color: 'bg-blue-600 hover:bg-blue-700' 
  },
  { 
    id: 'chatbots', 
    label: 'Chatbots', 
    icon: MessageSquare, 
    color: 'bg-purple-600 hover:bg-purple-700' 
  },
  { 
    id: 'image-generation', 
    label: 'Image Generation', 
    icon: Image, 
    color: 'bg-pink-600 hover:bg-pink-700' 
  },
  { 
    id: 'coding', 
    label: 'Coding', 
    icon: Code, 
    color: 'bg-green-600 hover:bg-green-700' 
  },
  { 
    id: 'data-analysis', 
    label: 'Data Analysis', 
    icon: Database, 
    color: 'bg-orange-600 hover:bg-orange-700' 
  },
  { 
    id: 'featured', 
    label: 'Featured', 
    icon: Star, 
    color: 'bg-yellow-600 hover:bg-yellow-700' 
  },
];