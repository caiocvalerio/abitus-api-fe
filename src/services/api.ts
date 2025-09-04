import axios, { AxiosInstance } from 'axios';

const URL_BASE: string = 'https://abitus-api.geia.vip'

const api: AxiosInstance = axios.create({
    baseURL: URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;