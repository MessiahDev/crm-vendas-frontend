import type { Customer } from "./Customer";
import { LeadStatus } from "./enums/LeadStatus";
import type { User } from "./User";

export interface Lead {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    status: LeadStatus;
    createdAt: Date;
    userId: number;
    user?: User;
    customerId: number;
    customer?: Customer;
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