"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { usePessoas } from "@/hooks/usePessoa";
import { useEstatistica } from "@/hooks/useEstatistica";
import type { FiltrosBusca, PagePessoa } from "@/types";
import MenuLateral from "@/components/layout/MenuLateral";
import Paginacao from "@/components/ui/Paginacao";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Estatisticas from "@/components/features/estatistica";
import PessoaCard from "@/components/features/pessoas";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Link from "next/link";

export default function HomePageClient({ initialPageData }: { initialPageData: PagePessoa }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filtros, setFiltros] = useState<FiltrosBusca>({});
    const [menuAberto, setMenuAberto] = useState(false);
    const { pageData, isLoading: isLoadingPessoas, error: errorPessoas } = usePessoas(filtros, currentPage, initialPageData);
    const { stats, isLoading: isLoadingStats } = useEstatistica();

    const handleSearch = (novosFiltros: FiltrosBusca) => {
        setFiltros(novosFiltros);
        setCurrentPage(1);
    };

    const handleLimpar = () => {
        setFiltros({});
        setCurrentPage(1);
    };

    useEffect(() => {
        if (menuAberto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [menuAberto]);

    return (
        <div className="flex min-h-screen bg-gray-100 lg:flex-row flex-col">
            <MenuLateral
                onBusca={handleSearch}
                onLimpar={handleLimpar}
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
            />

            <div className="flex-1 p-4 pt-24 lg:pt-4 min-w-0 relative">
                {isLoadingPessoas && <LoadingOverlay />}

                <div className={isLoadingPessoas ? 'opacity-50 pointer-events-none' : ''}>
                    <Estatisticas stats={stats} isLoading={isLoadingStats} />

                    {errorPessoas ? (
                        <ErrorMessage message={errorPessoas} />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24 pt-2.5 min-h-[300px]">
                                {pageData?.content && pageData.content.length > 0 ? (
                                    pageData.content.map((pessoa) => (
                                        <Link href={`/pessoa/${pessoa.id}`} key={pessoa.id}>
                                            <PessoaCard key={pessoa.id} pessoa={pessoa} />
                                        </Link>
                                    ))
                                ) : (
                                    !isLoadingPessoas && <p className="text-gray-600 col-span-full text-center">Nenhum resultado encontrado.</p>
                                )}
                            </div>

                            <AnimatePresence>
                                {!isLoadingPessoas && !menuAberto && pageData && pageData.totalPages > 1 && (
                                    <motion.div
                                        key="paginacao-container"
                                        className="fixed bottom-0 left-0 w-full z-30 md:relative md:w-auto md:z-auto md:mt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Paginacao
                                            totalPages={pageData.totalPages}
                                            currentPage={currentPage}
                                            onPageChange={setCurrentPage}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}