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
                    status: filtros.situacao === 'todos' ? undefined : filtros.situacao,
                    faixaIdadeInicial: filtros.idadeMinima ? Number(filtros.idadeMinima) : undefined,
                    faixaIdadeFinal: filtros.idadeMaxima ? Number(filtros.idadeMaxima) : undefined,
                };

                const data = await getPessoas(params);

                if (data.content) {
                    let refinedContent = data.content;

                    // Filtro de segurança para NOME
                    if (filtros.nome) {
                        const termoBusca = filtros.nome.toLowerCase().trim();
                        refinedContent = refinedContent.filter(pessoa => {
                            if (!pessoa.nome) return false;
                            return pessoa.nome.toLowerCase().startsWith(termoBusca);
                        });
                    }

                    /* Filtro de segurança para SITUAÇÃO
                    O chamado a API com filtro para status LOCALIZADO retornava pessoas marcadas como localizadas,
                    porém sem dataLocalizacao.
                    Por conta disso, optei por utilizar uma checagem para validar a fim de evitar falsos positivos.
                    */
                    if (filtros.situacao && filtros.situacao !== 'todos') {
                        refinedContent = refinedContent.filter(pessoa => {
                            const dataLocalizacao = pessoa.ultimaOcorrencia?.dataLocalizacao;
                            const foiLocalizado = dataLocalizacao != null && dataLocalizacao !== '';

                            if (filtros.situacao === 'LOCALIZADO') return foiLocalizado;
                            if (filtros.situacao === 'DESAPARECIDO') return !foiLocalizado;
                            return true;
                        });
                    }

                    setPageData({ ...data, content: refinedContent });
                } else {
                    setPageData(data);
                }

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