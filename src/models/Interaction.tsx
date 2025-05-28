import type { Customer } from "./Customer";
import type { Lead } from "./Lead";

export interface Interaction {
    id: number;
    type: string;
    notes?: string | null;
    date: Date;
    leadId?: number | null;
    lead?: Lead | null;
    customerId?: number | null;
    customer?: Customer | null;
}