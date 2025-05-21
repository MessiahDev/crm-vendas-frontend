import api from './ApiService/Api';
import type { Deal } from '../models/Deal'

export const DealService = {
    async getAll(): Promise<Deal[]> {
        const response = await api.get<Deal[]>('/Deal');
        return response.data;
    },

    async getById(id: number): Promise<Deal> {
        const response = await api.get<Deal>(`/Deal/${id}`);
        return response.data;
    },

    async create(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
        const response = await api.post<Deal>('/Deal', deal);
        return response.data;
    },

    async update(id: number, deal: Partial<Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Deal> {
        const response = await api.put<Deal>(`/Deal/${id}`, deal);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/Deal/${id}`);
    }
};