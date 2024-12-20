import { DATABASE_ENUMS } from './database';

export const FORM_OPTIONS = {
  PRICING: [
    { label: 'Free', value: DATABASE_ENUMS.PRICING.FREE },
    { label: 'Freemium', value: DATABASE_ENUMS.PRICING.FREEMIUM },
    { label: 'Paid', value: DATABASE_ENUMS.PRICING.PAID }
  ],
  SOURCE: [
    { label: 'Open Source', value: DATABASE_ENUMS.SOURCE.OPEN_SOURCE },
    { label: 'Closed Source', value: DATABASE_ENUMS.SOURCE.CLOSED_SOURCE }
  ]
} as const;