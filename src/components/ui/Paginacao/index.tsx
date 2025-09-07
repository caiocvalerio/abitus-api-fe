"use client";

import React, { JSX } from 'react';
import clsx from 'clsx';

interface PaginacaoProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

// --- ÍCONES PARA A VERSÃO MOBILE ---
const ChevronDoubleLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
    </svg>
);
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);
const ChevronDoubleRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
    </svg>
);

const getPaginationNumbers = (totalPages: number, currentPage: number, maxButtons = 5): Array<number | string> => {
    if (totalPages <= maxButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | string)[] = [];
    const half = Math.floor(maxButtons / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
        start = 1;
        end = maxButtons;
    }

    if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxButtons + 1;
    }

    if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
            pageNumbers.push('...');
        }
    }

    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
};

const Paginacao = ({ totalPages, currentPage, onPageChange }: PaginacaoProps): JSX.Element => {
    const paginationNumbers = getPaginationNumbers(totalPages, currentPage);

    // Estilos dos botões de número
    const pageButtonBaseStyles = "rounded-md py-2 px-4 text-sm transition-colors duration-200 cursor-pointer";
    const inactiveButtonStyles = "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100";
    const activeButtonStyles = "bg-blue-100 text-blue-700 border-blue-600 font-bold shadow-sm";

    // Estilo base para os botões de navegação (Primeira, Anterior, etc.)
    const navButtonBaseStyles = "inline-flex items-center justify-center rounded-md py-2 px-3 text-sm transition-colors duration-200 cursor-pointer border border-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-200 hover:enabled:bg-gray-100";


    return (
        <div className="flex justify-center items-center flex-wrap fixed bottom-0 left-0 w-full bg-white border-t p-2.5 gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-30 md:relative md:w-auto md:bg-transparent md:border-none md:shadow-none md:z-auto md:mt-8">

            <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={clsx(navButtonBaseStyles)}>
                <ChevronDoubleLeftIcon />
                <span className="hidden sm:inline ml-2">Primeira</span>
            </button>
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={clsx(navButtonBaseStyles)}>
                <ChevronLeftIcon />
                <span className="hidden sm:inline ml-2">Anterior</span>
            </button>

            {paginationNumbers.map((item, index) => {
                if (item === '...') {
                    return <span key={`ellipsis-${index}`} className="text-gray-500 px-1 py-2 hidden sm:inline">...</span>;
                }
                return (
                    <button
                        key={item as number}
                        onClick={() => onPageChange(item as number)}
                        className={clsx(pageButtonBaseStyles, item === currentPage ? activeButtonStyles : inactiveButtonStyles)}
                    >
                        {item}
                    </button>
                );
            })}

            <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={clsx(navButtonBaseStyles)}>
                <span className="hidden sm:inline mr-2">Próxima</span>
                <ChevronRightIcon />
            </button>
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={clsx(navButtonBaseStyles)}>
                <span className="hidden sm:inline mr-2">Última</span>
                <ChevronDoubleRightIcon />
            </button>
        </div>
    );
};

export default Paginacao;