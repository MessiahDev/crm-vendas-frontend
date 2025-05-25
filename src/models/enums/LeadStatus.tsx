export const LeadStatus = {
  Novo: 0,
  Contactado: 1,
  Qualificado: 2,
  Perdido: 3,
  Convertido: 4,
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];