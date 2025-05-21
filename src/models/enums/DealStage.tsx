export const DealStage = {
    Novo: 'Novo',
    Negociacao: 'Negociacao',
    PropostaEnviada: 'PropostaEnviada',
    FechadoGanho: 'FechadoGanho',
    FechadoPerdido: 'FechadoPerdido'
} as const;

export type DealStage = typeof DealStage[keyof typeof DealStage];
