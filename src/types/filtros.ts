export interface FiltrosBusca {
    nome?: string;
    sexo?: 'MASCULINO' | 'FEMININO' | '';
    situacao?: 'todos' | 'LOCALIZADO' | 'DESAPARECIDO';
    idadeMinima?: string;
    idadeMaxima?: string;
    vivo?: 'todos' | 'true' | 'false'
}

export type FiltrosAvancadosData = Omit<FiltrosBusca, 'nome'>;