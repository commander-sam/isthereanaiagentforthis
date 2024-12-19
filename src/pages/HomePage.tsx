import React from 'react';
import Hero from '../components/Hero';
import FeaturedTools from '../components/sections/FeaturedTools';
import AllTools from '../components/sections/AllTools';
import CategoriesSection from '../components/sections/CategoriesSection';
import { categories } from '../data/categories';
import { useTools } from '../hooks/useTools';

export default function HomePage() {
  const tools = useTools();
  const featuredTools = tools.filter(tool => tool.featured);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <FeaturedTools tools={featuredTools} />
      <AllTools tools={tools} />
      <CategoriesSection categories={categories} />
    </div>
  );
}