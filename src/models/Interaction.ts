export interface Interaction {
    id: number;
    type: string;
    notes?: string | null;
    date: Date;
    leadId?: number | null;
    customerId?: number | null;
}