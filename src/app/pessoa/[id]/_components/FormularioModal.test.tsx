import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormularioModal from './FormularioModal';
import { adicionarInformacaoOcorrencia } from '@/services/pessoaService';
import toast from 'react-hot-toast';
import { OcorrenciaInformacao } from '@/types';

vi.mock('@/services/pessoaService');
vi.mock('react-hot-toast');

const mockedAdicionarInformacao = vi.mocked(adicionarInformacaoOcorrencia);
const mockedToastSuccess = vi.mocked(toast.success);
const mockedToastError = vi.mocked(toast.error);


describe('Componente: FormularioModal', () => {

    const mockOnClose = vi.fn();
    const defaultProps = {
        isOpen: true,
        onClose: mockOnClose,
        ocoId: 123,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /*
     * Objetivo: Garantir que o formulário não seja exibido quando não deve.
     * Renderizamos o modal com a prop `isOpen` como `false` e verificamos
     * se o título do modal não está presente na tela.
     */
    it('não deve renderizar nada quando isOpen for false', () => {
        render(<FormularioModal {...defaultProps} isOpen={false} />);

        const titulo = screen.queryByText('Adicionar Nova Informação');
        expect(titulo).toBeNull();
    });

    /*
     * Objetivo: Simular a digitação do usuário em um campo de texto
     * e verificar se o valor do campo é atualizado corretamente na UI.
     */
    it('deve atualizar o campo de informação quando o usuário digita', async () => {
        const user = userEvent.setup();
        render(<FormularioModal {...defaultProps} />);
        const textareaInformacao = screen.getByLabelText(/Informações sobre o que viu/i);
        await user.type(textareaInformacao, 'Pessoa vista perto do shopping.');

        expect(textareaInformacao).toHaveValue('Pessoa vista perto do shopping.');
    });

    /*
     * Objetivo: Testar o fluxo de submissão bem-sucedido.
     * Simulamos o preenchimento do formulário, o clique em "Enviar" e verificamos
     * se a função de serviço foi chamada com os dados corretos, se o toast de sucesso
     * apareceu e se o modal foi fechado.
     */
    it('deve chamar o serviço com os dados corretos e mostrar toast de sucesso ao submeter', async () => {
        const user = userEvent.setup();

        const mockApiResponse: OcorrenciaInformacao = {
            id: 999,
            ocoId: 123,
            informacao: 'Informação de teste',
            data: '2025-09-04',
            anexos: undefined,
        };

        mockedAdicionarInformacao.mockResolvedValue(mockApiResponse);
        render(<FormularioModal {...defaultProps} />);

        const inputData = screen.getByLabelText(/Data em que viu a pessoa/i);
        const textareaInformacao = screen.getByLabelText(/Informações sobre o que viu/i);
        const inputDescricao = screen.getByLabelText(/Descrição do anexo/i);

        await user.type(inputData, '2025-09-04');
        await user.type(textareaInformacao, 'Informação de teste');
        await user.type(inputDescricao, 'Descrição de teste');

        const botaoEnviar = screen.getByRole('button', { name: /Enviar Informação/i });
        await user.click(botaoEnviar);

        await waitFor(() => {
            expect(mockedAdicionarInformacao).toHaveBeenCalledOnce();
            expect(mockedAdicionarInformacao).toHaveBeenCalledWith(expect.objectContaining({
                ocoId: 123,
                data: '2025-09-04',
                informacao: 'Informação de teste',
                descricao: 'Descrição de teste',
            }));
            expect(mockedToastSuccess).toHaveBeenCalledWith('Informação enviada com sucesso!');
            expect(mockOnClose).toHaveBeenCalledOnce();
        });
    });
});