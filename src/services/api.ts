import axios from 'axios';

const URL_BASE: string = 'https://abitus-api.geia.vip'

const api = axios.create({
    baseURL: URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;