import Api from './ApiService/Api';
import type { Lead } from '../models/Lead'

export const LeadService = {
    async getAll(): Promise<Lead[]> {
        const response = await Api.get<Lead[]>('/Lead');
        return response.data;
    },

    async getById(id: number): Promise<Lead> {
        const response = await Api.get<Lead>(`/Lead/${id}`);
        return response.data;
    },

    async create(lead: Lead): Promise<Lead> {
        const response = await Api.post<Lead>('/Lead', lead);
        return response.data;
    },

    async update(id: number, lead: Lead): Promise<Lead> {
        const response = await Api.put<Lead>(`/Lead/${id}`, lead);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await Api.delete(`/Lead/${id}`);
    }
};