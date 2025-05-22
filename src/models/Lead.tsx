import { LeadStatus } from "./enums/LeadStatus";

export interface Lead {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    status: LeadStatus;
    createdAt: Date;
    userId: number;
    customerId: number;
}