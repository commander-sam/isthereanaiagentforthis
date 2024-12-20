import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Agent } from '../../../types';
import GradientCard from '../../../components/common/GradientCard';
import LinksList from '../../../components/common/LinksList';
import DetailsList from '../../../components/common/DetailsList';
import CategoryBadge from '../../../components/common/CategoryBadge';

interface AgentSidebarProps {
  agent: Agent;
}

export default function AgentSidebar({ agent }: AgentSidebarProps) {
  const links = [
    { icon: ExternalLink, label: 'Website', url: agent.url },
    ...(agent.githubUrl ? [{ icon: Github, label: 'GitHub Repository', url: agent.githubUrl }] : []),
  ];

  const details = [
    {
      label: 'Category',
      value: <CategoryBadge category={agent.category} />,
    },
    {
      label: 'Last Updated',
      value: <span className="text-white">March 15, 2024</span>,
    },
    {
      label: 'License',
      value: <span className="text-white">MIT</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <GradientCard>
        <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
        <LinksList links={links} />
      </GradientCard>

      <GradientCard>
        <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
        <DetailsList details={details} />
      </GradientCard>
    </div>
  );
}