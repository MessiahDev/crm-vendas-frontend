import { LeadStatus } from "./enums/LeadStatus";

export interface Lead {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    status: LeadStatus;
    userId: number;
    customerId: number;
}

export interface CreateLead {
    name: string;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    status: LeadStatus;
    userId: number;
    customerId: number;
}