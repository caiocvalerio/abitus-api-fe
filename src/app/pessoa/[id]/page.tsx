import { getPessoaById } from "@/services/pessoaService";
import Link from "next/link";

import DetalheHeader from "./_components/DetalheHeader";
import InfoPessoais from "./_components/InfoPessoais";
import BotaoAcao from "./_components/BotaoAcao";
import InfoOcorrencia from "./_components/InfoOcorrencias";

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export default async function PessoaDetalhePage({ params }: { params: Promise<{ id: string }> }) {

    const pessoa = await getPessoaById(Number((await (params)).id));
    const isLocalizada = !! (await pessoa).ultimaOcorrencia?.dataLocalizacao;
    const status = isLocalizada ? 'Localizada' : 'Desaparecida';
    const tagClasses = isLocalizada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    return (
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
                    <BotaoAcao />
                </div>
            </div>
        </div>
    );
}