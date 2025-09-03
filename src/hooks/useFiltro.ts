import { useState } from 'react';
import type { FiltrosBusca, FiltrosAvancadosData } from '@/types';

interface UseFiltrosProps {
    onBusca: (filtros: FiltrosBusca) => void;
    onLimpar: () => void;
    setMenuAberto: (aberto: boolean) => void;
}

export const useFiltros = ({ onBusca, onLimpar, setMenuAberto }: UseFiltrosProps) => {
    const [termoBusca, setTermoBusca] = useState('');
    const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
    const [filtrosAvancados, setFiltrosAvancados] = useState<FiltrosAvancadosData>({
        sexo: '', situacao: 'todos', idadeMinima: '', idadeMaxima: '',
    });

    const handleBuscaClick = () => {
        const todosFiltros: FiltrosBusca = { nome: termoBusca, ...filtrosAvancados };
        onBusca(todosFiltros);
        setMenuAberto(false);
    };

    const handleLimparClick = () => {
        setTermoBusca('');
        setFiltrosAvancados({
            sexo: '', situacao: 'todos', idadeMinima: '', idadeMaxima: ''
        });
        onLimpar();
    };

    const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFiltrosAvancados(prev => ({ ...prev, [name]: value }));
    };
    
    return {
        termoBusca,
        setTermoBusca,
        filtrosVisiveis,
        setFiltrosVisiveis,
        filtrosAvancados,
        handleFiltroChange,
        handleBuscaClick,
        handleLimparClick
    };
};