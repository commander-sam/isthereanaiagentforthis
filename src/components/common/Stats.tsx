import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  icon?: LucideIcon;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="flex items-center text-white space-x-2">
            {stat.icon && <stat.icon className="h-5 w-5" />}
            <span>{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}