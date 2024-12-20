import React, { useState, useEffect } from 'react';
import { Agent } from '../../../types';
import { AgentFormData } from '../../../types/admin';
import BasicInformation from './BasicInformation';
import SocialLinks from '../../form/SocialLinks';
import StatusSelect from './StatusSelect';
import GradientCard from '../../common/GradientCard';
import { validateAgentForm } from '../../../utils/validation';
import { DATABASE_ENUMS } from '../../../constants/database';

interface AdminAgentFormProps {
  initialData?: Agent;
  onSubmit: (data: AgentFormData) => Promise<void>;
  onCancel: () => void;
}

export default function AdminAgentForm({ initialData, onSubmit, onCancel }: AdminAgentFormProps) {
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    shortDescription: '',
    description: '',
    logo: null,
    source: DATABASE_ENUMS.SOURCE.CLOSED_SOURCE,
    pricing: DATABASE_ENUMS.PRICING.FREE,
    contactEmail: '',
    websiteUrl: '',
    githubUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    discordUrl: '',
    status: DATABASE_ENUMS.STATUS.DRAFT,
    category: 'chatbots',
    featured: false,
    imageUrl: ''
  });

  // Rest of the component remains the same...
}