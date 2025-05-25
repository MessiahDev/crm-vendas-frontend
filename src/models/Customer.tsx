export interface Customer {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    convertedAt: Date;
    userId: number;
}

export interface CustomerRequest {
    name: string;
    email: string;
    phone?: string;
    convertedAt: Date;
    userId: number;
}