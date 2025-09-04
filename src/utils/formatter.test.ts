import { describe, it, expect } from 'vitest';
import { formataNome } from './formatter';

describe('Função: formataNome', () => {

    /*
     * Objetivo: Testar o caso mais básico com um único nome em minúsculas.
     * Espera-se que a primeira letra seja capitalizada.
     */
    it('deve capitalizar um nome simples corretamente', () => {
        expect(formataNome('caio')).toBe('Caio');
    });

    /*
     * Objetivo: Testar um nome composto para garantir que todas as palavras
     * sejam capitalizadas corretamente.
     */
    it('deve capitalizar nomes compostos corretamente', () => {
        expect(formataNome('joão da silva')).toBe('João Da Silva');
    });

    /*
     * Objetivo: Garantir que a função normalize nomes que já estão
     * totalmente em maiúsculas.
     */
    it('deve lidar com nomes totalmente em maiúsculas', () => {
        expect(formataNome('MARIA SOUZA')).toBe('Maria Souza');
    });

    /*
     * Objetivo: Garantir a normalização de nomes com capitalização mista.
     */
    it('deve lidar com nomes com capitalização mista', () => {
        expect(formataNome('pEdRo aLvEs')).toBe('Pedro Alves');
    });

    /*
     * Objetivo: Testar os casos de borda onde a entrada é vazia ou nula.
     * A função deve retornar um valor padrão e não quebrar.
     */
    it('deve retornar "N/A" para entradas vazias ou nulas', () => {
        expect(formataNome('')).toBe('N/A');
        // @ts-expect-error
        expect(formataNome(null)).toBe('N/A');
    });

    /*
     * Objetivo: Testar se a função é robusta a espaços extras no início ou no fim,
     * que podem ser inseridos acidentalmente pelo usuário.
     */
    it('deve remover espaços extras no início e no fim do nome', () => {
        expect(formataNome('  ana clara  ')).toBe('Ana Clara');
    });

});