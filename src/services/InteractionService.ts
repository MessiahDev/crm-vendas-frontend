import api from './ApiService/Api';
import type { Interaction } from '../models/Interaction';

export const InteractionService = {
    async getAll(): Promise<Interaction[]> {
        const response = await api.get<Interaction[]>('/Interaction');
        return response.data;
    },

    async getById(id: number): Promise<Interaction> {
        const response = await api.get<Interaction>(`/Interaction/${id}`);
        return response.data;
    },

    async create(interaction: Omit<Interaction, 'id'>): Promise<Interaction> {
        const response = await api.post<Interaction>('/Interaction', interaction);
        return response.data;
    },

    async update(id: number, interaction: Omit<Interaction, 'id'>): Promise<Interaction> {
        const response = await api.put<Interaction>(`/Interaction/${id}`, interaction);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/Interaction/${id}`);
    }
};