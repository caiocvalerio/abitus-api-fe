import { useState, useEffect } from 'react';
import { getPessoas } from '../services/pessoaService';
import type { FiltrosBusca, PagePessoa } from '../types';
import toast from 'react-hot-toast';

type UsePessoaReturn = {
    pageData: PagePessoa | null;
    isLoading: boolean;
}

export const usePessoas = (filtros: FiltrosBusca, pagina: number, initialData: PagePessoa | null = null): UsePessoaReturn => {
    const isInitialLoad = pagina === 1 && Object.keys(filtros).length === 0 && !!initialData;
    const [pageData, setPageData] = useState<PagePessoa | null>(initialData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (isInitialLoad && initialData) {
            setPageData(initialData);
            return;
        }

        const fetchPessoas = async () => {
            setIsLoading(true);

            try {
                const params = {
                    pagina: pagina - 1,
                    porPagina: 12,
                    nome: filtros.nome || undefined,
                    sexo: filtros.sexo || undefined,
                    status: filtros.situacao || 'DESAPARECIDO',
                    faixaIdadeInicial: filtros.idadeMinima ? Number(filtros.idadeMinima) : undefined,
                    faixaIdadeFinal: filtros.idadeMaxima ? Number(filtros.idadeMaxima) : undefined,
                };

                const data = await getPessoas(params);
                setPageData(data);

            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('Ocorreu um erro inesperado.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPessoas();
    }, [filtros.nome, filtros.sexo, filtros.situacao, filtros.idadeMinima, filtros.idadeMaxima, pagina, initialData, isInitialLoad]);
    return { pageData, isLoading };
};