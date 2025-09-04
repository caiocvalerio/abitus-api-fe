import React, { JSX } from "react";
import type { EstatisticaPessoaDTO } from "@/types";
import { AlertIcon, CheckIcon } from "./icones";
import StatCard from "./EstatisticaCard";


interface EstatisticasProps {
    stats: EstatisticaPessoaDTO | null;
    isLoading: boolean;
}

const Estatisticas = ({ stats, isLoading }: EstatisticasProps): JSX.Element => {
    if (isLoading || !stats) {
        return (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="h-[92px] bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-[92px] bg-gray-200 rounded-xl animate-pulse"></div>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <StatCard
                title="Pessoas Desaparecidas"
                value={stats.quantPessoasDesaparecidas}
                icon={<AlertIcon />}
                color="red"
            />
            <StatCard
                title="Pessoas Localizadas"
                value={stats.quantPessoasEncontradas}
                icon={<CheckIcon />}
                color="green"
            />
        </section>
    );
}

export default Estatisticas;