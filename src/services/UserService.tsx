import api from './ApiService/Api';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/User'

export const userService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/User/login', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    validateToken: async (token: string): Promise<void> => {
        await api.get(`/User/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(`/User/register`, data);
        return response.data;
    },

    async getAll(): Promise<User[]> {
        const response = await api.get<User[]>('/User');
        return response.data;
    },

    async getById(id: number): Promise<User> {
        const response = await api.get<User>(`/User/${id}`);
        return response.data;
    },

    async create(user: User): Promise<User> {
        const response = await api.post<User>('/User', user);
        return response.data;
    },

    async update(id: number, user: User): Promise<User> {
        const response = await api.put<User>(`/User/${id}`, user);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/User/${id}`);
    },
};
