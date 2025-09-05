import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PagePessoa, PessoaResumo } from '@/types';
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
    * Objetivo: Testar o ciclo completo de busca.
    * Verificamos se o hook busca os dados, trata a lista de acordo
    * com o filtro de nome e retorna o resultado correto.
    */
    it('deve buscar dados e refiná-los de acordo com o filtro de nome', async () => {
        mockedGetPessoas.mockResolvedValue(mockPageData);

        const filtros = { nome: 'Ana' };
        const { result } = renderHook(() => usePessoas(filtros, 1));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.pageData?.content).toHaveLength(1);
            expect(result.current.pageData?.content?.[0].nome).toBe('Ana Localizada');
        });

        expect(mockedGetPessoas).toHaveBeenCalledTimes(1);
    });


    /*
     * Objetivo: Testar o estado de carregamento.
     * Verificamos se a variável 'isLoading' se torna 'true' durante a busca
     * e 'false' quando a busca termina.
     */
    it('deve filtrar os resultados por "LOCALIZADO" no frontend', async () => {
        mockedGetPessoas.mockResolvedValue(mockPageData);
        const { result } = renderHook(() => usePessoas({ situacao: "LOCALIZADO" }, 1));

        await waitFor(() => {
            expect(result.current.pageData?.content).toHaveLength(2);
            expect(result.current.pageData?.content?.map(p => p.nome))
                .toEqual(expect.arrayContaining(['Ana Localizada', 'Carla Localizada']));
        });
    });
});