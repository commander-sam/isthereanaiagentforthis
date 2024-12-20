import React from 'react';

interface AgentImageProps {
  imageUrl: string;
  name: string;
}

export default function AgentImage({ imageUrl, name }: AgentImageProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-50 blur"></div>
      <div className="relative h-32 w-32 rounded-xl overflow-hidden border border-white/20 backdrop-blur-xl">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}