import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPessoas } from '@/services/pessoaService';
import { usePessoas } from './usePessoa';
import type { PagePessoa, FiltrosBusca } from '@/types';

vi.mock('@/services/pessoaService');
const mockedGetPessoas = vi.mocked(getPessoas);

const mockPageData: PagePessoa = {
    content: [{ id: 1, nome: 'Ana Teste', ultimaOcorrencia: { dataLocalizacao: '2025-01-01' }, vivo: true }],
    totalPages: 1,
};

describe('Hook: usePessoas', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockedGetPessoas.mockResolvedValue(mockPageData);
    });

    /*
     * Objetivo: Verificar se o hook utiliza os dados iniciais sem fazer chamada à API.
     */
    it('deve usar os dados iniciais e não buscar novos dados na primeira carga', () => {
        renderHook(() => usePessoas({}, 1, mockPageData));
        expect(mockedGetPessoas).not.toHaveBeenCalled();
    });

    /*
     * Objetivo: Verificar se o hook chama o serviço getPessoas com os parâmetros
     * corretamente formatados a partir dos filtros da UI.
     */
    it('deve chamar o serviço getPessoas com os parâmetros formatados corretamente', async () => {
        const filtrosDaUI: FiltrosBusca = {
            nome: 'Maria',
            situacao: 'LOCALIZADO',
            idadeMinima: '20',
        };
        
        renderHook(() => usePessoas(filtrosDaUI, 3));
        
        await waitFor(() => {
            expect(mockedGetPessoas).toHaveBeenCalledTimes(1);
        });

        expect(mockedGetPessoas).toHaveBeenCalledWith({
            pagina: 2, // página 3 - 1
            porPagina: 12,
            nome: 'Maria',
            status: 'LOCALIZADO',
            faixaIdadeInicial: 20,
            faixaIdadeFinal: undefined, 
            sexo: undefined,
            vivo: undefined,
        });
    });

    /*
     * Objetivo: Verificar se os dados retornados pelo serviço são
     * repassados corretamente para o estado do hook.
     */
    it('deve atualizar pageData com o retorno da API', async () => {
        const { result } = renderHook(() => usePessoas({ nome: 'teste' }, 1));

        await waitFor(() => {
            expect(result.current.pageData).toEqual(mockPageData);
        });
    });
});