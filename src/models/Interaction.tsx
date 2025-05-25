export interface Interaction {
    id: number;
    type: string;
    notes?: string | null;
    date: Date;
    leadId?: number | null;
    leadName?: string | null;
    customerId?: number | null;
    customerName?: string | null;
}