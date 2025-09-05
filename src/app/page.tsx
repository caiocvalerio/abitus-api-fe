"use client"; //vercel

import { useEffect, useState } from "react";
import { getPessoas } from "@/services/pessoaService";
import HomePageClient from "./_components/HomePageClient";
import { PagePessoa } from "@/types";

export default function Home() {
  const [pageData, setPageData] = useState<PagePessoa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPessoas({ pagina: 0, porPagina: 12 });
        setPageData(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return <HomePageClient initialPageData={pageData!} />;
}
