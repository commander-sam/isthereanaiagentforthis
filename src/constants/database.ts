// These must match exactly with the database enum values
export const DATABASE_ENUMS = {
    PRICING: {
      FREE: 'free',
      FREEMIUM: 'freemium', 
      PAID: 'paid'
    },
    SOURCE: {
      OPEN_SOURCE: 'open_source',
      CLOSED_SOURCE: 'closed_source'
    },
    STATUS: {
      DRAFT: 'draft',
      PENDING: 'pending',
      APPROVED: 'approved',
      REJECTED: 'rejected'
    }
  } as const;