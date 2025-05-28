import type { DashboardData } from '../models/DashboardData';
import api from './ApiService/Api';

export const DashboardService = {
    async getAll(): Promise<DashboardData> {
        const response = await api.get('/Dashboard');
        return response.data;
    }
};