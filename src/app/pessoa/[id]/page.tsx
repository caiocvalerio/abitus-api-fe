"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PessoaResumo } from "@/types";
import { getPessoaById } from "@/services/pessoaService";
import Link from "next/link";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import DetalheHeader from "./_components/DetalheHeader";
import InfoPessoais from "./_components/InfoPessoais";
import BotaoAcao from "./_components/BotaoAcao";
import FormularioModal from "./_components/FormularioModal";
import InfoOcorrencia from "./_components/InfoOcorrencias";

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

export default function PessoaDetalhePage() {
  const params = useParams();
  const id = params.id as string;

  const [pessoa, setPessoa] = useState<PessoaResumo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPessoa = async () => {
        try {
          const data = await getPessoaById(Number(id));
          setPessoa(data);
        } catch (e) {
          console.error(e);
          setPessoa(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPessoa();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!pessoa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="mb-4 text-xl text-slate-700">Pessoa não encontrada.</p>
        <Link href="/" className="inline-flex items-center text-blue-950 font-semibold hover:underline">
          <ArrowLeftIcon />
          Voltar para a busca
        </Link>
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