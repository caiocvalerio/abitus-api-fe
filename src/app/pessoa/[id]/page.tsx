"use client";

import { useEffect, useState } from "react";
import { getPessoaById } from "@/services/pessoaService";
import DetalhesPageClient from "./_components/DetalhesPageClient";
import { PessoaResumo } from "@/types";

interface PessoaDetalhePageProps {
  params: { id: string };
}

export default function PessoaDetalhePage({ params }: PessoaDetalhePageProps) {
  const [pessoa, setPessoa] = useState<PessoaResumo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPessoa() {
      try {
        const data = await getPessoaById(Number(params.id));
        setPessoa(data);
      } finally {
        setLoading(false);
      }
    }
    fetchPessoa();
  }, [params.id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!pessoa) {
    return <div>Não encontrado</div>;
  }

  return <DetalhesPageClient pessoa={pessoa} />;
}
