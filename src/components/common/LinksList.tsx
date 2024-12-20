import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Link {
  icon: LucideIcon;
  label: string;
  url: string;
}

interface LinksListProps {
  links: Link[];
}

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className="space-y-3">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Icon className="h-5 w-5 mr-2" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}