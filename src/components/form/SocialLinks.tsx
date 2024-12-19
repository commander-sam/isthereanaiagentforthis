import React from 'react';
import { Github, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import FormInput from './FormInput';

interface SocialLinksProps {
  values: {
    githubUrl?: string;
    twitterUrl?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
    discordUrl?: string;
  };
  onChange: (name: string, value: string) => void;
  errors: Record<string, string>;
}

export default function SocialLinks({ values, onChange, errors }: SocialLinksProps) {
  const links = [
    { name: 'githubUrl', icon: Github, label: 'GitHub Link' },
    { name: 'twitterUrl', icon: Twitter, label: 'Twitter Link' },
    { name: 'facebookUrl', icon: Facebook, label: 'Facebook Link' },
    { name: 'linkedinUrl', icon: Linkedin, label: 'LinkedIn Link' },
    { name: 'discordUrl', icon: MessageCircle, label: 'Discord Link' },
  ];

  return (
    <div className="space-y-4">
      {links.map(({ name, icon: Icon, label }) => (
        <FormInput
          key={name}
          label={label}
          name={name}
          type="url"
          value={values[name as keyof typeof values] || ''}
          onChange={(e) => onChange(name, e.target.value)}
          error={errors[name]}
          icon={<Icon className="h-5 w-5" />}
          placeholder="https://"
        />
      ))}
    </div>
  );
}