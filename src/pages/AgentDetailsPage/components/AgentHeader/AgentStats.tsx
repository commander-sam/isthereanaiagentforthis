import React from 'react';
import { Users, Clock, Award } from 'lucide-react';
import Stats from '../../../../components/common/Stats';

export default function AgentStats() {
  const stats = [
    { icon: Users, label: '50k+ Monthly Users' },
    { icon: Clock, label: 'Updated 2 days ago' },
    { icon: Award, label: 'Featured Agent' }
  ];

  return (
    <div className="mt-8">
      <Stats stats={stats} />
    </div>
  );
}