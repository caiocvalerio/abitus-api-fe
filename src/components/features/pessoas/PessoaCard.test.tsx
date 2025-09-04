import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PessoaCard from './index';
import type { PessoaResumo } from '@/types';

describe('Componente: PessoaCard', () => {

    /*
     * Objetivo: Testar a renderização de um card para uma pessoa desaparecida.
     * Verificamos se o nome, a idade e a tag "Desaparecida" são exibidos.
     */
    it('deve renderizar as informações de uma pessoa desaparecida corretamente', () => {
        const pessoaDesaparecida: PessoaResumo = {
            id: 1,
            nome: 'João da Silva',
            idade: 35,
            sexo: 'MASCULINO',
            vivo: true,
            ultimaOcorrencia: { dataLocalizacao: undefined }
        };
        render(<PessoaCard pessoa={pessoaDesaparecida} />);

        expect(screen.getByRole('heading', { name: /João Da Silva/i })).toBeInTheDocument();
        expect(screen.getByText('35')).toBeInTheDocument();
        expect(screen.getByText('Desaparecida')).toBeInTheDocument();
    });
    
    /*
     * Objetivo: Testar a renderização de um card para uma pessoa localizada.
     * Verificamos se o nome, a idade e a tag "Localizada" são exibidos.
     */
    it('deve renderizar as informações de uma pessoa localizada corretamente', () => {
        const pessoaLocalizada: PessoaResumo = {
            id: 2,
            nome: 'Maria Souza',
            idade: 28,
            sexo: 'FEMININO',
            vivo: true,
            ultimaOcorrencia: { dataLocalizacao: '2025-01-01' }
        };
        render(<PessoaCard pessoa={pessoaLocalizada} />);

        expect(screen.getByRole('heading', { name: /Maria Souza/i })).toBeInTheDocument();
        expect(screen.getByText('28')).toBeInTheDocument();
        expect(screen.getByText('Localizada')).toBeInTheDocument();
    });
});