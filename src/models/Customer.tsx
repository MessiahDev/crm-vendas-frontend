import type { User } from "./User";

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    convertedAt: Date;
    userId: number;
    user?: User
}

export interface CustomerRequest {
    name: string;
    email: string;
    phone?: string;
    convertedAt: Date;
    userId: number;
}