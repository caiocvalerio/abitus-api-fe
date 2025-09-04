"use client";

import type { FiltrosBusca } from "@/types";
import clsx from "clsx";
import FiltrosAvancados from "./FiltrosAvancados";
import BotoesAcao from "./BotoesAcao";
import { useFiltros } from "@/hooks/useFiltro";
import { ChevronIcon, CloseIcon, MenuIcon } from "./Icons";
import { JSX } from "react";

interface PropsMenuLateral {
    onBusca: (filtros: FiltrosBusca) => void;
    onLimpar: () => void;
    menuAberto: boolean;
    setMenuAberto: React.Dispatch<React.SetStateAction<boolean>>;
}


const MenuLateral = (props: PropsMenuLateral): JSX.Element => {
    const {
        termoBusca,
        setTermoBusca,
        filtrosVisiveis,
        setFiltrosVisiveis,
        filtrosAvancados,
        handleFiltroChange,
        handleBuscaClick,
        handleLimparClick
    } = useFiltros(props);

    const { menuAberto, setMenuAberto } = props;

    return (
        <>
            {/* Cabeçalho Fixo para Mobile */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">SBPD</h1>
                <button onClick={() => setMenuAberto(true)} className="p-2" aria-label="Abrir menu de filtros">
                    <MenuIcon/>
                </button>
            </header>

            {/* Overlay */}
            {menuAberto && (
                <div onClick={() => setMenuAberto(false)} className="lg:hidden fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
            )}

            {/* Painel de Filtros */}
            <aside className={clsx(
                "bg-white shadow-lg flex flex-col p-6 transition-transform duration-300 ease-in-out",
                "overflow-y-auto",
                "fixed top-0 left-0 h-full w-[280px] z-50 -translate-x-full",
                { 'translate-x-0': menuAberto },
                "lg:relative lg:translate-x-0 lg:h-auto lg:shadow-md lg:overflow-y-visible"
            )}>
                <div className="flex flex-col w-full flex-grow">

                    {/* Cabeçalho do menu mobile com botão de fechar */}
                    <div className="flex justify-between items-center lg:hidden mb-6">
                        <button onClick={() => setMenuAberto(false)} className="p-2" aria-label="Fechar menu">
                            <CloseIcon />
                        </button>
                    </div>
                    
                    {/* Logo para Desktop */}
                    <div className="hidden lg:flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-blue-950">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-wide leading-tight">SBPD</h1>
                            <p className="text-xs text-slate-500 leading-tight">Consulte registros de pessoas desaparecidas e localizadas.</p>
                        </div>
                    </div>

                    {/* Input de Busca por Nome */}
                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Botão de Busca Avançada com Divisória */}
                    <div className="w-full border-t border-gray-200 mt-6">
                        <button onClick={() => setFiltrosVisiveis(!filtrosVisiveis)} className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-700 hover:text-blue-950 transition-colors">
                            Busca Avançada
                            <ChevronIcon className={clsx("w-4 h-4 transition-transform duration-300", { 'rotate-180': filtrosVisiveis })} />
                        </button>
                    </div>

                    {/* Componente dos Filtros */}
                    <FiltrosAvancados 
                        visivel={filtrosVisiveis}
                        filtros={filtrosAvancados}
                        onFiltroChange={handleFiltroChange}
                    />

                    <BotoesAcao 
                        onLimpar={handleLimparClick}
                        onBuscar={handleBuscaClick}
                    />
                </div>
                
                
            </aside>
        </>
    );
}

export default MenuLateral;