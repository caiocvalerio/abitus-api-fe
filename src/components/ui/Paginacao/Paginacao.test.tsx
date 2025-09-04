import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Paginacao from './index';

describe('Componente: Paginacao', () => {

    /*
     * Objetivo: Verificar se a página atual é visualmente destacada.
     * Renderizamos a paginação na página 5 e procuramos um botão
     * com o nome "5" que tenha o estilo de "ativo".
     */
    it('deve renderizar o botão da página atual como ativo', () => {
        const mockOnPageChange = vi.fn();
        render(<Paginacao totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />);
        const activeButton = screen.getByRole('button', { name: '5' });

        expect(activeButton).toHaveClass('bg-blue-100');
        expect(activeButton).toHaveClass('text-blue-700');
    });

    /*
     * Objetivo: Simular um clique no botão "Próxima" e garantir
     * que a função de callback `onPageChange` seja chamada com o número da página correto.
     */
    it('deve chamar onPageChange com a página correta ao clicar em "Próxima"', async () => {
        const user = userEvent.setup();
        const mockOnPageChange = vi.fn();
        render(<Paginacao totalPages={10} currentPage={2} onPageChange={mockOnPageChange} />);
        const proximaButton = screen.getByRole('button', { name: /Próxima/i });
        await user.click(proximaButton);

        expect(mockOnPageChange).toHaveBeenCalledOnce();
        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    /*
     * Objetivo: Garantir que a navegação seja prevenida nos limites.
     * Verificamos se os botões "Primeira" e "Anterior" estão desabilitados
     * quando estamos na primeira página.
     */
    it('deve desabilitar os botões de "Primeira" e "Anterior" na página 1', () => {
        const mockOnPageChange = vi.fn();
        render(<Paginacao totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />);
        const primeiraButton = screen.getByRole('button', { name: /Primeira/i });
        const anteriorButton = screen.getByRole('button', { name: /Anterior/i });
        
        expect(primeiraButton).toBeDisabled();
        expect(anteriorButton).toBeDisabled();
    });

});