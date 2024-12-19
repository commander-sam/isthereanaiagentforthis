import { Category } from '../types';
import { MessageSquare, Image, Code, Database, Brain, Sparkles } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'chatbots',
    name: 'Chatbots',
    description: 'Conversational AI agents for various purposes',
    icon: 'MessageSquare'
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    description: 'AI tools for creating and editing images',
    icon: 'Image'
  },
  {
    id: 'coding',
    name: 'Coding Assistants',
    description: 'AI-powered development tools',
    icon: 'Code'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'AI tools for analyzing and visualizing data',
    icon: 'Database'
  }
];