import axios, { AxiosInstance } from 'axios';

const URL_BASE: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!URL_BASE) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_API_BASE_URL não está definida. Ver README para mais informações.");
}

const api: AxiosInstance = axios.create({
    baseURL: URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
    //timeout: 15000, // retirado para tentar deploy pela vercel
});

export default api;