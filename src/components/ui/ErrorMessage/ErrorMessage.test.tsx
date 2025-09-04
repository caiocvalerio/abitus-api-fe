import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './index';

describe('Componente: ErrorMessage', () => {

    /*
     * Objetivo: Verificar se o componente renderiza corretamente tanto o título
     * estático ('Ocorreu um erro') quanto a mensagem de erro dinâmica
     * que é passada através das props.
     */
    it('deve renderizar a mensagem de erro passada via props', () => {
        const mensagemDeTeste = "O servidor parece estar offline.";
        render(<ErrorMessage message={mensagemDeTeste} />);
        const tituloElemento = screen.getByText('Ocorreu um erro');
        const mensagemElemento = screen.getByText(mensagemDeTeste);

        expect(tituloElemento).toBeInTheDocument();
        expect(mensagemElemento).toBeInTheDocument();
    });

    /*
     * Objetivo: Testar o caso em que uma mensagem vazia é passada.
     * O componente não deve quebrar e deve renderizar a string vazia.
     */
    it('deve renderizar corretamente com uma mensagem vazia', () => {
        render(<ErrorMessage message="" />);
        expect(screen.getByText('Ocorreu um erro')).toBeInTheDocument();
    });
});