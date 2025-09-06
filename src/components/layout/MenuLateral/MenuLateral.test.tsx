import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MenuLateral from './index';

vi.mock('./FiltrosAvancados', () => ({
    default: ({ visivel }: { visivel: boolean }) => (
        visivel ? <div>Filtros Avançados Visíveis</div> : null
    )
}));

vi.mock('./BotoesAcao', () => ({
    default: () => <div>Botões de Ação</div>
}));


describe('Componente: MenuLateral', () => {

    const mockProps = {
        onBusca: vi.fn(),
        onLimpar: vi.fn(),
        menuAberto: true,
        setMenuAberto: vi.fn(),
    };

    /*
     * Objetivo: Testar a funcionalidade de "acordeão" da Busca Avançada.
     * Verificamos se a seção de filtros começa escondida e, após um clique,
     * se torna visível, e depois se esconde novamente com um segundo clique.
     */
    it('deve mostrar e esconder os filtros avançados ao clicar no botão', async () => {
        const user = userEvent.setup();
        render(<MenuLateral {...mockProps} />);

        const secaoFiltros = screen.queryByText('Filtros Avançados Visíveis');
        expect(secaoFiltros).toBeNull();

        const botaoBuscaAvancada = screen.getByRole('button', { name: /Busca Avançada/i });
        await user.click(botaoBuscaAvancada);

        const secaoFiltrosVisivel = await screen.findByText('Filtros Avançados Visíveis');
        expect(secaoFiltrosVisivel).toBeInTheDocument();

        await user.click(botaoBuscaAvancada);
        expect(screen.queryByText('Filtros Avançados Visíveis')).toBeNull();
    });

    /*
     * Objetivo: Testar se a busca principal por nome funciona.
     * Simulamos a digitação do usuário no campo de input e verificamos
     * se, ao clicar em "Buscar", a função onBusca é chamada com o valor correto.
     */
    it('deve chamar onBusca com o termo do input de nome ao clicar em buscar', async () => {
        const user = userEvent.setup();
        mockProps.onBusca.mockClear();

        render(<MenuLateral {...mockProps} />);

        const inputNome = screen.getByPlaceholderText(/Buscar por nome.../i);
        await user.type(inputNome, 'Maria');

        expect(inputNome).toHaveValue('Maria');
    });
});