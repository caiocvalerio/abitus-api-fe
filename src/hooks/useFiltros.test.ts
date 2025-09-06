import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFiltros } from './useFiltro';
import { ChangeEvent } from 'react';

describe('Hook: useFiltros', () => {

    const mockOnBusca = vi.fn();
    const mockOnLimpar = vi.fn();
    const mockSetMenuAberto = vi.fn();
    const defaultProps = {
        onBusca: mockOnBusca,
        onLimpar: mockOnLimpar,
        setMenuAberto: mockSetMenuAberto,
    };

    /*
     * Objetivo: Garantir que o hook inicie com um estado limpo e previsível.
     * Verifica se o termo de busca está vazio, se os filtros avançados estão
     * nos seus valores padrão e se a seção de filtros está inicialmente oculta.
     */
    it('deve inicializar com os valores padrão corretos', () => {
        const { result } = renderHook(() => useFiltros(defaultProps));

        expect(result.current.termoBusca).toBe('');
        expect(result.current.filtrosVisiveis).toBe(false);
        expect(result.current.filtrosAvancados.sexo).toBe('');
        expect(result.current.filtrosAvancados.situacao).toBe('todos');
    });

    /*
     * Objetivo: Testar a funcionalidade de "limpar filtros".
     * Este teste simula um usuário preenchendo alguns campos,
     * depois chama a função de limpar e verifica duas coisas:
     *      1. Se os estados internos (termoBusca, filtrosAvancados) foram resetados.
     *      2. Se a função onLimpar (recebida via prop) foi chamada.
     */
    it('deve limpar todos os campos ao chamar handleLimparClick', () => {
        const { result } = renderHook(() => useFiltros(defaultProps));

        act(() => {
            result.current.setTermoBusca('Teste');
            result.current.handleFiltroChange({ target: { name: 'sexo', value: 'MASCULINO' } } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
        });

        expect(result.current.termoBusca).toBe('Teste');
        expect(result.current.filtrosAvancados.sexo).toBe('MASCULINO');

        act(() => {
            result.current.handleLimparClick();
        });

        expect(result.current.termoBusca).toBe('');
        expect(result.current.filtrosAvancados.sexo).toBe('');
        expect(mockOnLimpar).toHaveBeenCalledTimes(1);
    });

    /*
     * Objetivo: Testar a funcionalidade principal de "buscar".
     * O teste preenche todos os filtros, chama a função de busca e
     * verifica se a prop onBusca foi chamada com um único objeto
     * que combina corretamente o termo de busca e os filtros avançados.
     */
    it('deve chamar onBusca com todos os filtros combinados ao clicar em handleBuscaClick', () => {
        const { result } = renderHook(() => useFiltros(defaultProps));

        const termo = 'Maria';
        const filtros = {
            sexo: 'FEMININO',
            situacao: 'LOCALIZADO',
            vivo: 'true',
            idadeMinima: '20',
            idadeMaxima: '30'
        };

        act(() => {
            result.current.setTermoBusca(termo);

            Object.entries(filtros).forEach(([name, value]) => {
                result.current.handleFiltroChange({ target: { name, value } } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
            });
        });

        act(() => {
            result.current.handleBuscaClick();
        });

        expect(mockOnBusca).toHaveBeenCalledTimes(1);
        expect(mockOnBusca).toHaveBeenCalledWith({
            nome: termo,
            ...filtros
        });
    });
});