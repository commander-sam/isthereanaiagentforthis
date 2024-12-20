export const AGENT_PRICING = {
    FREE: 'free',
    FREEMIUM: 'freemium',
    PAID: 'paid'
  } as const;
  
  export const AGENT_SOURCE = {
    OPEN_SOURCE: 'open_source',
    CLOSED_SOURCE: 'closed_source'
  } as const;
  
  export const AGENT_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  } as const;