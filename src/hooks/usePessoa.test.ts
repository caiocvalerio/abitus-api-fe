import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { FiltrosBusca, PagePessoa, PessoaResumo } from '@/types';
import { getPessoas } from '@/services/pessoaService';
import { usePessoas } from './usePessoa';

vi.mock('@/services/pessoaService');
const mockedGetPessoas = vi.mocked(getPessoas);

const mockPessoas: PessoaResumo[] = [
    { id: 1, nome: 'Ana Localizada', ultimaOcorrencia: { dataLocalizacao: '2025-01-01' }, vivo: true },
    { id: 2, nome: 'Beto Desaparecido', ultimaOcorrencia: { dataLocalizacao: undefined }, vivo: true },
    { id: 3, nome: 'Carla Localizada', ultimaOcorrencia: { dataLocalizacao: '2025-02-02' }, vivo: false },
    { id: 4, nome: 'Daniel Desaparecido', ultimaOcorrencia: { dataLocalizacao: '' }, vivo: true }, 
];

const mockPageData: PagePessoa = {
    content: mockPessoas,
    totalPages: 1,
};


describe('Hook: usePessoas', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /*
     * Objetivo: Verificar se o hook utiliza os dados iniciais passados via props
     * sem fazer uma nova chamada à API.
     */
    it('deve usar os dados iniciais e não buscar novos dados na primeira carga', () => {
        renderHook(() => usePessoas({}, 1, mockPageData));
        expect(mockedGetPessoas).not.toHaveBeenCalled();
    });

    /*
     * Objetivo: Testar o filtro de segurança para 'Situação'.
     * Simulamos uma resposta da API com dados misturados e verificamos se o hook
     * retorna apenas as pessoas que correspondem ao filtro 'LOCALIZADO',
     * usando a regra de negócio do campo 'dataLocalizacao'.
     */
    it('deve filtrar os resultados por "LOCALIZADO" no frontend', async () => {
        mockedGetPessoas.mockResolvedValue(mockPageData);

        const filtros: FiltrosBusca = { situacao: 'LOCALIZADO' };
        const { result } = renderHook(() => usePessoas(filtros, 1));
        
        await waitFor(() => {
            expect(result.current.pageData?.content).toHaveLength(2);
            expect(result.current.pageData?.content?.[0].nome).toBe('Ana Localizada');
            expect(result.current.pageData?.content?.[1].nome).toBe('Carla Localizada');
        });
    });

    /*
     * Objetivo: Testar o estado de carregamento.
     * Verificamos se a variável 'isLoading' se torna 'true' durante a busca
     * e 'false' quando a busca termina.
     */
    it('deve definir isLoading como true durante a busca e false depois', async () => {
        mockedGetPessoas.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockPageData), 10)));
        const { result } = renderHook(() => usePessoas({ nome: 'teste' }, 1));
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
    });
});