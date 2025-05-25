export const LeadSource = {
  Referral: 'Indicação',
  Website: 'Website',
  SocialMedia: 'Mídia Social',
  Email: 'Email',
  ColdCall: 'Ligação Fria',
  Event: 'Evento',
  Ads: 'Anúncio Pago',
  Inbound: 'Inbound Marketing',
  Other: 'Outro'
} as const;

export type LeadSource = typeof LeadSource[keyof typeof LeadSource];