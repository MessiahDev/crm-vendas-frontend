import type { Customer } from "./Customer";
import type { DealStage } from "./enums/DealStage";
import type { Lead } from "./Lead";

export interface Deal {
    id: number;
    title: string;
    value: number;
    stage: DealStage;
    createdAt: Date;
    customerId: number;
    customer?: Customer;
    leadId: number;
    lead?: Lead;
}