import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: `
      <h2>The Most Advanced AI Chatbot</h2>
      <p>ChatGPT is an advanced language model that understands and generates human-like text. It's designed to engage in natural conversations and assist with various tasks.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Natural language understanding and generation</li>
        <li>Context-aware responses</li>
        <li>Multi-turn conversations</li>
        <li>Code generation and debugging</li>
      </ul>
      
      <h3>Use Cases</h3>
      <ul>
        <li>Content creation and editing</li>
        <li>Programming assistance</li>
        <li>Learning and tutoring</li>
        <li>Creative writing</li>
      </ul>
    `,
    shortDescription: 'Versatile AI chatbot for text generation and assistance',
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-c0326a0333d5?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'chatbots',
    url: 'https://chat.openai.com',
    featured: true
  },
  {
    id: '2',
    name: 'DALL-E',
    description: `
      <h2>AI-Powered Image Generation</h2>
      <p>DALL-E is a revolutionary AI system that creates unique and creative images from textual descriptions, pushing the boundaries of artificial creativity.</p>
      
      <h3>Capabilities</h3>
      <ul>
        <li>Generate images from text descriptions</li>
        <li>Edit and modify existing images</li>
        <li>Understand complex visual concepts</li>
        <li>Create variations of images</li>
      </ul>
      
      <h3>Applications</h3>
      <ul>
        <li>Digital art creation</li>
        <li>Design prototyping</li>
        <li>Content visualization</li>
        <li>Creative exploration</li>
      </ul>
    `,
    shortDescription: 'Create unique images from text descriptions',
    imageUrl: 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'image-generation',
    url: 'https://openai.com/dall-e-2',
    featured: true
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    description: `
      <h2>Your AI Programming Partner</h2>
      <p>GitHub Copilot is an AI-powered code completion tool that helps developers write better code faster by suggesting whole lines or blocks of code as you type.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Real-time code suggestions</li>
        <li>Multiple programming language support</li>
        <li>Context-aware completions</li>
        <li>Test generation</li>
      </ul>
      
      <h3>Benefits</h3>
      <ul>
        <li>Increased productivity</li>
        <li>Reduced boilerplate coding</li>
        <li>Learning new languages and frameworks</li>
        <li>Quick problem-solving</li>
      </ul>
    `,
    shortDescription: 'AI pair programmer for faster coding',
    imageUrl: 'https://images.unsplash.com/photo-1686787154773-2f8b5c0f6f48?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'coding',
    url: 'https://github.com/features/copilot',
    featured: true
  },
  {
    id: '4',
    name: 'Midjourney',
    description: `
      <h2>Advanced AI Art Generation</h2>
      <p>Midjourney is an AI-powered tool that creates stunning artwork and illustrations from text descriptions, offering unprecedented creative possibilities.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>High-quality image generation</li>
        <li>Style customization</li>
        <li>Artistic variations</li>
        <li>Community features</li>
      </ul>
    `,
    shortDescription: 'Create beautiful AI-generated artwork',
    imageUrl: 'https://images.unsplash.com/photo-1683009427513-28e163402d16?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'image-generation',
    url: 'https://www.midjourney.com',
    featured: false
  },
  {
    id: '5',
    name: 'Claude',
    description: `
      <h2>Advanced AI Assistant</h2>
      <p>Claude is an AI assistant created by Anthropic, known for its strong capabilities in analysis, writing, and coding tasks.</p>
      
      <h3>Capabilities</h3>
      <ul>
        <li>Long-form content creation</li>
        <li>Complex analysis</li>
        <li>Code generation and review</li>
        <li>Research assistance</li>
      </ul>
    `,
    shortDescription: 'Versatile AI assistant for analysis and writing',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'chatbots',
    url: 'https://www.anthropic.com/claude',
    featured: false
  },
  {
    id: '6',
    name: 'AutoGPT',
    description: `
      <h2>Autonomous AI Agent</h2>
      <p>AutoGPT is an experimental open-source application that demonstrates the capabilities of the GPT-4 language model in autonomous task completion.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Autonomous task execution</li>
        <li>Internet browsing capability</li>
        <li>File operations</li>
        <li>Long-term memory</li>
      </ul>
    `,
    shortDescription: 'Autonomous AI agent for task completion',
    imageUrl: 'https://images.unsplash.com/photo-1676299082239-d3106d8e9937?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'coding',
    url: 'https://github.com/Significant-Gravitas/Auto-GPT',
    featured: false
  },
  {
    id: '7',
    name: 'Tableau',
    description: `
      <h2>Data Visualization Platform</h2>
      <p>Tableau is a powerful data visualization tool that helps you see and understand your data with AI-powered insights.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Interactive dashboards</li>
        <li>AI-powered analytics</li>
        <li>Real-time data processing</li>
        <li>Advanced visualizations</li>
      </ul>
    `,
    shortDescription: 'AI-enhanced data visualization platform',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'data-analysis',
    url: 'https://www.tableau.com',
    featured: false
  },
  {
    id: '8',
    name: 'PowerBI',
    description: `
      <h2>Business Intelligence Tool</h2>
      <p>Microsoft Power BI is a business analytics tool that provides interactive visualizations and AI-powered business intelligence capabilities.</p>
      
      <h3>Capabilities</h3>
      <ul>
        <li>AI-powered insights</li>
        <li>Custom visualizations</li>
        <li>Data modeling</li>
        <li>Real-time analytics</li>
      </ul>
    `,
    shortDescription: 'AI-powered business intelligence platform',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'data-analysis',
    url: 'https://powerbi.microsoft.com',
    featured: false
  }
];