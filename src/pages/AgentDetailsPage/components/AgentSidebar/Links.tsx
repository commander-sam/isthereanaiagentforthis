import React from 'react';
import { ExternalLink, Github, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Agent } from '../../../../types';
import GradientCard from '../../../../components/common/GradientCard';

interface LinksProps {
  agent: Agent;
}

export default function Links({ agent }: LinksProps) {
  const links = [
    { icon: ExternalLink, label: 'Website', url: agent.url },
    ...(agent.githubUrl ? [{ icon: Github, label: 'GitHub', url: agent.githubUrl }] : []),
    ...(agent.twitterUrl ? [{ icon: Twitter, label: 'Twitter', url: agent.twitterUrl }] : []),
    ...(agent.facebookUrl ? [{ icon: Facebook, label: 'Facebook', url: agent.facebookUrl }] : []),
    ...(agent.linkedinUrl ? [{ icon: Linkedin, label: 'LinkedIn', url: agent.linkedinUrl }] : []),
    ...(agent.discordUrl ? [{ icon: MessageCircle, label: 'Discord', url: agent.discordUrl }] : [])
  ].filter(link => link.url);

  if (links.length === 0) return null;

  return (
    <GradientCard>
      <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
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
    </GradientCard>
  );
}