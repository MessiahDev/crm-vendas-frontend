import type { UserRole } from "./enums/UserRole";

export interface User {
    id: number;
    name: string;
    email: string;
    role: 2;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface UpdateRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}