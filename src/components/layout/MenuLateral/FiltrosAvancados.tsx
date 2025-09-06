import React, { JSX } from 'react';
import FiltroAccordion from './FiltroAccordion';
import clsx from 'clsx';
import { FiltrosAvancadosData } from '@/types';

interface FiltrosAvancadosProps {
    visivel: boolean;
    filtros: FiltrosAvancadosData;
    onFiltroChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FiltrosAvancados = ({ visivel, filtros, onFiltroChange }: FiltrosAvancadosProps): JSX.Element => {
    const inputStyles = "w-full p-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";
    const inputIdadeStyles = "mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className={clsx("overflow-hidden transition-all duration-500 ease-in-out", {
            'max-h-screen opacity-100': visivel,
            'max-h-0 opacity-0': !visivel
        })}>
            <div className="space-y-4 pt-4">

                {/* --- Filtro de Gênero --- */}
                <FiltroAccordion title="Gênero">
                    <div className="p-4">
                        <select name="sexo" value={filtros.sexo} onChange={onFiltroChange} className={inputStyles}>
                            <option value="">Todos</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                        </select>
                    </div>
                </FiltroAccordion>

                {/* --- Filtro de Situação --- */}
                <FiltroAccordion title="Situação">
                    <div className="p-4">
                        <select name="situacao" value={filtros.situacao} onChange={onFiltroChange} className={inputStyles}>
                            <option value="todos">Todos</option>
                            <option value="LOCALIZADO">Localizadas</option>
                            <option value="DESAPARECIDO">Desaparecidas</option>
                        </select>
                    </div>
                </FiltroAccordion>

                {/* --- Filtro de Faixa Etária --- */}
                <FiltroAccordion title="Faixa Etária">
                    <div className="flex items-center gap-4 p-4">
                        <label className="flex-1">
                            <span className="text-sm text-gray-700">Mínima</span>
                            <input
                                type="number"
                                name="idadeMinima"
                                value={filtros.idadeMinima}
                                onChange={onFiltroChange}
                                placeholder="Ex: 18"
                                className={inputIdadeStyles}
                            />
                        </label>
                        <span className="text-gray-400">-</span>
                        <label className="flex-1">
                            <span className="text-sm text-gray-700">Máxima</span>
                            <input
                                type="number"
                                name="idadeMaxima"
                                value={filtros.idadeMaxima}
                                onChange={onFiltroChange}
                                placeholder="Ex: 60"
                                className={inputIdadeStyles}
                            />
                        </label>
                    </div>
                </FiltroAccordion>

                <span></span>
            </div>
        </div>
    );
};

export default FiltrosAvancados;