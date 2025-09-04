import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Estatisticas from './index';
import type { EstatisticaPessoaDTO } from '@/types';

describe('Componente: Estatisticas', () => {

    /*
     * Objetivo: Testar o estado de carregamento do componente.
     * Verificamos se, quando a prop 'isLoading' é verdadeira,
     * o componente renderiza seus elementos de placeholder (esqueleto).
     */
    it('deve renderizar o esqueleto de loading quando isLoading for true', () => {
        render(<Estatisticas stats={null} isLoading={true} />);
        const placeholders = screen.queryAllByTestId('loading-placeholder');
        expect(placeholders).toHaveLength(2);
    });

    /*
     * Objetivo: Testar o estado final com os dados recebidos.
     * Passamos um objeto de estatísticas mockado e verificamos se os números
     * e os títulos corretos são exibidos na tela.
     */
    it('deve renderizar os dados corretamente quando não está carregando', () => {
        const mockStats: EstatisticaPessoaDTO = {
            quantPessoasDesaparecidas: 428,
            quantPessoasEncontradas: 753,
        };
        render(<Estatisticas stats={mockStats} isLoading={false} />);
        
        expect(screen.getByText('428')).toBeInTheDocument();
        expect(screen.getByText('Pessoas Desaparecidas')).toBeInTheDocument();
        expect(screen.getByText('753')).toBeInTheDocument();
        expect(screen.getByText('Pessoas Localizadas')).toBeInTheDocument();
    });
});