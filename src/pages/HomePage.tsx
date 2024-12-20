import React from 'react';
import Hero from '../components/Hero';
import FeaturedAgents from '../components/sections/FeaturedAgents';
import AllAgents from '../components/sections/AllAgents';
import CategoriesSection from '../components/sections/CategoriesSection';
import { categories } from '../data/categories';
import { useAgents } from '../hooks/useAgents';

export default function HomePage() {
  const agents = useAgents();
  const featuredAgents = agents.filter(agent => agent.featured);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeaturedAgents agents={featuredAgents} />
      <AllAgents agents={agents} />
      <CategoriesSection categories={categories} />
    </div>
  );
}