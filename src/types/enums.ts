import { DATABASE_ENUMS } from '../constants/database';

// Database enum types that match the PostgreSQL enums exactly
export type AgentPricing = typeof DATABASE_ENUMS.PRICING[keyof typeof DATABASE_ENUMS.PRICING];
export type AgentSource = typeof DATABASE_ENUMS.SOURCE[keyof typeof DATABASE_ENUMS.SOURCE];
export type AgentStatus = typeof DATABASE_ENUMS.STATUS[keyof typeof DATABASE_ENUMS.STATUS];

// Re-export database enums for convenience
export const AGENT_ENUMS = DATABASE_ENUMS;