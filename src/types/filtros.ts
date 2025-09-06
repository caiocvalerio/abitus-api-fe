export interface FiltrosBusca {
    nome?: string;
    sexo?: 'MASCULINO' | 'FEMININO' | '';
    situacao?: 'LOCALIZADO' | 'DESAPARECIDO';
    idadeMinima?: string;
    idadeMaxima?: string;
    vivo?: 'todos' | 'true' | 'false'
}

export type FiltrosAvancadosData = Omit<FiltrosBusca, 'nome'>;