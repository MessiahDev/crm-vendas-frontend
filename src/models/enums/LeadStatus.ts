export const LeadStatus = {
    Novo: 'Novo',
    EmContato: 'EmContato',
    Qualificado: 'Qualificado',
    Perdido: 'Perdido',
    Convertido: 'Convertido'
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];