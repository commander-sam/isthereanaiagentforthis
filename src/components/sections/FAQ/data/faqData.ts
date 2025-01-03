export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export const faqData: FAQItem[] = [
    {
      question: "What is an AI agent?",
      answer: "An AI agent is a software program powered by artificial intelligence that can perform tasks, make decisions, and interact with users autonomously. These agents can range from simple chatbots to complex systems capable of automation, analysis, and problem-solving."
    },
    {
      question: "How do I submit my AI agent?",
      answer: "You can submit your AI agent by clicking the 'Submit an Agent' button in the navigation bar. Fill out the required information about your agent, including its features, use cases, and relevant links. Our team will review your submission and approve it if it meets our quality standards."
    },
    {
      question: "Are all listed agents free to use?",
      answer: "No, not all agents are free. Each listing clearly indicates the pricing model: free, freemium (basic features free with paid upgrades), or paid. You can filter agents by pricing model to find ones that match your budget."
    },
    {
      question: "How are featured agents selected?",
      answer: "Featured agents are selected based on multiple criteria including user ratings, innovative features, reliability, and overall impact in their respective categories. Our team regularly reviews and updates the featured section to showcase the best AI agents."
    },
    {
      question: "Can I integrate these agents into my own projects?",
      answer: "Integration capabilities vary by agent. Many agents provide APIs or SDKs for integration, while others may be standalone applications. Check each agent's documentation and technical specifications for integration details."
    }
  ];