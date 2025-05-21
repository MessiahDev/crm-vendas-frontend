import api from './ApiService/Api';
import type { Customer } from '../models/Customer';

export const CustomerService = {
    async getAll(): Promise<Customer[]> {
        const response = await api.get<Customer[]>('/Customer');
        return response.data;
    },

    async getById(id: number): Promise<Customer> {
        const response = await api.get<Customer>(`/Customer/${id}`);
        return response.data;
    },

    async create(customer: Customer): Promise<Customer> {
        const response = await api.post<Customer>('/Customer', customer);
        return response.data;
    },

    async update(id: number, customer: Customer): Promise<Customer> {
        const response = await api.put<Customer>(`/Customer/${id}`, customer);
        return response.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/Customer/${id}`);
    }
};