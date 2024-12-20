import { Agent } from '../types';

export const agents: Agent[] = [
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
    `,
    shortDescription: 'Versatile AI chatbot for text generation and assistance',
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-c0326a0333d5?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'chatbots',
    url: 'https://chat.openai.com',
    featured: true,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '2',
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
    featured: true,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '3',
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
    category: 'automation',
    url: 'https://github.com/Significant-Gravitas/Auto-GPT',
    featured: false,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'ResearchGPT',
    description: `
      <h2>AI-Powered Research Assistant</h2>
      <p>ResearchGPT helps researchers and academics streamline their literature review process and analyze scientific papers.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Paper summarization</li>
        <li>Citation analysis</li>
        <li>Research trend identification</li>
        <li>Cross-reference checking</li>
      </ul>
    `,
    shortDescription: 'AI assistant for academic research and paper analysis',
    imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'research',
    url: 'https://github.com/example/research-gpt',
    featured: true,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'CodePilot AI',
    description: `
      <h2>Intelligent Coding Assistant</h2>
      <p>CodePilot AI is your pair programming partner that helps write, review, and optimize code across multiple programming languages.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Code completion and suggestions</li>
        <li>Bug detection and fixing</li>
        <li>Code refactoring assistance</li>
        <li>Documentation generation</li>
      </ul>
    `,
    shortDescription: 'AI-powered coding assistant for developers',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'coding',
    url: 'https://example.com/codepilot',
    featured: true,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'TaskMaster AI',
    description: `
      <h2>Automated Workflow Assistant</h2>
      <p>TaskMaster AI automates repetitive tasks and manages complex workflows across your applications and tools.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Workflow automation</li>
        <li>Task scheduling</li>
        <li>Integration management</li>
        <li>Performance monitoring</li>
      </ul>
    `,
    shortDescription: 'Intelligent automation agent for workflow optimization',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'automation',
    url: 'https://example.com/taskmaster',
    featured: false,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'DataScout AI',
    description: `
      <h2>Research Data Analyzer</h2>
      <p>DataScout AI helps researchers analyze large datasets, identify patterns, and generate insights from complex research data.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Data pattern recognition</li>
        <li>Statistical analysis</li>
        <li>Visualization generation</li>
        <li>Hypothesis testing</li>
      </ul>
    `,
    shortDescription: 'AI agent for research data analysis',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'research',
    url: 'https://example.com/datascout',
    featured: false,
    status: 'approved',
    submittedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'BugHunter AI',
    description: `
      <h2>Automated Code Testing Agent</h2>
      <p>BugHunter AI automatically tests your code, identifies potential bugs, and suggests fixes before they reach production.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Automated testing</li>
        <li>Bug prediction</li>
        <li>Code quality analysis</li>
        <li>Security vulnerability detection</li>
      </ul>
    `,
    shortDescription: 'AI agent for automated code testing and debugging',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'coding',
    url: 'https://example.com/bughunter',
    featured: false,
    status: 'approved',
    submittedAt: new Date().toISOString()
  }
];