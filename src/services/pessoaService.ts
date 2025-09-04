import { AdicionarInformacaoPayload, EstatisticaPessoaDTO, OcorrenciaInformacao, PagePessoa, PessoaResumo, PessoaSearchParams } from "@/types";
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
        console.error("Falha ao buscar pessoas: ", error);

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return { content: [], totalPages: 0 }; 
            }
            throw new Error('O servidor parece estar com problemas. Tente novamente mais tarde.');
        }
        
        throw new Error('Não foi possível carregar a lista de pessoas');
    }
}

export const getEstatisticas = async () : Promise<EstatisticaPessoaDTO> => {
    try {
        const response = await api.get('/v1/pessoas/aberto/estatistico');
        return response.data;
    } catch (error) {
        console.error("Falha ao buscar estatísticas:", error);
        throw new Error('Não foi possível carregar as estatísticas.');
    }
}

export const getPessoaById = async (id: number): Promise<PessoaResumo> => {
    try {
        const response = await api.get(`/v1/pessoas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Falha ao buscar pessoa com ID ${id}:`, error);
        throw new Error('Não foi possível carregar os detalhes da pessoa.');
    }
}


export const adicionarInformacaoOcorrencia = async (payload: AdicionarInformacaoPayload): Promise<OcorrenciaInformacao> => {
    const formData = new FormData();

    formData.append('ocoId', String(payload.ocoId));
    formData.append('informacao', payload.informacao);
    formData.append('data', payload.data);
    formData.append('descricao', payload.descricao);

    if (payload.files) {
        for (let i = 0; i < payload.files.length; i++) {
            formData.append('files', payload.files[i]);
        }
    }

    try {
        const response = await fetch('/api/informacao', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha na requisição');
        }

        return await response.json();

    } catch (error) {
        console.error("Falha ao adicionar informação:", error);
        throw error;
    }
};