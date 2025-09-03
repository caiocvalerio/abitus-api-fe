import { EstatisticaPessoaDTO, PagePessoa, PessoaDetalhes, PessoaResumo, PessoaSearchParams } from "@/types";
import api from "./api";
import axios from "axios";

export const getPessoas = async (params: PessoaSearchParams): Promise<PagePessoa> => {
    try {
        const queryParams: Record<string, string | number | boolean> = {
            pagina: params.pagina ?? 0,
            porPagina: params.porPagina ?? 10,
        };

        if (params.nome) queryParams.nome = params.nome;
        if (params.sexo) queryParams.sexo = params.sexo;
        if (params.status) queryParams.status = params.status;
        if (params.vivo !== undefined) queryParams.vivo = params.vivo;
        if (params.faixaIdadeInicial) queryParams.faixaIdadeInicial = params.faixaIdadeInicial;
        if (params.faixaIdadeFinal) queryParams.faixaIdadeFinal = params.faixaIdadeFinal;

        const response = await api.get('/v1/pessoas/aberto/filtro', {
            params: queryParams
        });

        return response.data;
    } catch (error) {
        console.log("[ERROR] Falha ao buscar pessoas: ", error);

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return { content: [], totalPages: 0 }; 
            }
            throw new Error('O servidor parece estar com problemas. Tente novamente mais tarde.');
        }
        
        throw new Error('Não foi possível carregar a lista de pessoas');
    }
}

export const getEstatistica = async () : Promise<EstatisticaPessoaDTO> => {
    try {
        const response = await api.get('/v1/pessoas/aberto/estatistico');
        return response.data;
    } catch (error) {
        console.error("[ERROR] Falha ao buscar estatísticas:", error);
        throw new Error('Não foi possível carregar as estatísticas.');
    }
}

export const getPessoaById = async (id: number): Promise<PessoaResumo> => {
    try {
        const response = await api.get(`/v1/pessoas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`[ERROR] Falha ao buscar pessoa com ID ${id}:`, error);
        throw new Error('Não foi possível carregar os detalhes da pessoa.');
    }
}