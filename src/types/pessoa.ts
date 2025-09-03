import { Page } from "./api";
import { Ocorrencia } from "./ocorrencia";

// PessoaDTO
export interface PessoaResumo {
    id?: number;
    dtNascimento?: string;
    nome?: string;
    idade?: number;
    sexo?: 'MASCULINO' | 'FEMININO';
    vivo?: boolean;
    urlFoto?: string;
    ultimaOcorrencia?: Ocorrencia;
}

//PessoaDto
export interface PessoaDetalhes {
    id: number;
    nome: string;
    mae?: string;
    pai?: string;
    dtNascimento?: string;
    idade?: number;
    sexo?: 'MASCULINO' | 'FEMININO';
    vivo?: boolean;
    urlFoto?: string;
    cpfCnpj?: string;
    rgNumero?: string;
    ultimaOcorrencia?: Ocorrencia; // Mantemos a ocorrência
}


export type PagePessoa = Page<PessoaResumo>;

export interface PessoaSearchParams {
    nome?: string;
    faixaIdadeInicial?: number;
    faixaIdadeFinal?: number;
    sexo?: 'MASCULINO' | 'FEMININO';
    pagina?: number;
    porPagina?: number;
    status?: 'DESAPARECIDO' | 'LOCALIZADO';
    vivo?: boolean;
}