import type { DealStage } from "./enums/DealStage";

export interface Deal {
    id: number;
    title: string;
    value: number;
    stage: DealStage;
    createdAt: Date;
    customerId: number;
    customerName?: string;
    leadId: number;
    leadName?: string;
}