"use client";

import { JSX, useState } from "react";
import type { PessoaResumo } from "@/types";
import Link from "next/link";
import DetalheHeader from "./DetalheHeader";
import InfoPessoais from "./InfoPessoais";
import BotaoAcao from "./BotaoAcao";
import FormularioModal from "./FormularioModal";
import InfoOcorrencia from "./InfoOcorrencias";

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export default function DetalhesPageClient({ pessoa }: { pessoa: PessoaResumo }): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!pessoa) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Pessoa não encontrada.
            </div>
        );
    }

    const isLocalizada = !!pessoa.ultimaOcorrencia?.dataLocalizacao;
    const status = isLocalizada ? 'Localizada' : 'Desaparecida';
    const tagClasses = isLocalizada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 md:p-8">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-blue-950 font-semibold hover:underline">
                            <ArrowLeftIcon />
                            Voltar para a busca
                        </Link>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                        <DetalheHeader pessoa={pessoa} status={status} tagClasses={tagClasses} />
                        <InfoPessoais pessoa={pessoa} />
                        <InfoOcorrencia ocorrencia={pessoa.ultimaOcorrencia} isLocalizada={isLocalizada} />
                        <BotaoAcao onClick={() => setIsModalOpen(true)}>
                            Tenho uma informação
                        </BotaoAcao>
                    </div>
                </div>
            </div>

            <FormularioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ocoId={pessoa.ultimaOcorrencia?.ocoId}
            />
        </>
    );
}