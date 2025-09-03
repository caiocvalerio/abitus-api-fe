"use client";

import React from 'react';
import clsx from 'clsx'; 

interface PaginacaoProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const getPaginationNumbers = (totalPages: number, currentPage: number, maxButtons = 5) => {
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

const Paginacao: React.FC<PaginacaoProps> = ({ totalPages, currentPage, onPageChange }) => {
    const paginationNumbers = getPaginationNumbers(totalPages, currentPage);

    // Estilos organizados para clareza
    const baseButtonStyles = "rounded-md py-2 px-4 text-base transition-colors duration-200 cursor-pointer";
    const inactiveButtonStyles = "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 hover:border-gray-400";
    const activeButtonStyles = "bg-blue-100 text-blue-700 border-blue-600 font-bold shadow-sm";
    const navButtonStyles = "bg-transparent text-gray-600 border border-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-200 hover:enabled:bg-gray-100";

    return (
        // A CORREÇÃO ESTÁ TODA NESTA LINHA ABAIXO
        <div className="flex justify-center items-center flex-wrap fixed bottom-0 left-0 w-full bg-white border-t p-2.5 gap-1 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-30 md:relative md:w-auto md:bg-transparent md:border-none md:shadow-none md:z-auto md:mt-8 md:gap-2">
            
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={clsx(baseButtonStyles, navButtonStyles)}>
                Primeira
            </button>
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={clsx(baseButtonStyles, navButtonStyles)}>
                Anterior
            </button>

            {paginationNumbers.map((item, index) => {
                if (item === '...') {
                    return <span key={`ellipsis-${index}`} className="text-gray-500 mx-1 px-2 py-2">...</span>;
                }
                return (
                    <button
                        key={item as number}
                        onClick={() => onPageChange(item as number)}
                        className={clsx(
                            baseButtonStyles,
                            item === currentPage ? activeButtonStyles : inactiveButtonStyles
                        )}
                    >
                        {item}
                    </button>
                );
            })}

            <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={clsx(baseButtonStyles, navButtonStyles)}>
                Próxima
            </button>
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={clsx(baseButtonStyles, navButtonStyles)}>
                Última
            </button>
        </div>
    );
};

export default Paginacao;