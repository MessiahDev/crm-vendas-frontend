export const DealStage = {
    Novo: 0,
    Negociacao: 1,
    PropostaEnviada: 2,
    FechadoGanho: 3,
    FechadoPerdido: 4
} as const;

export type DealStage = typeof DealStage[keyof typeof DealStage];
