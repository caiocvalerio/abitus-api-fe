"use server"; // tentativa de subir projeto no vercel

import { getPessoas } from "@/services/pessoaService";
import HomePageClient from "./_components/HomePageClient";
import { JSX } from "react";
import { PagePessoa } from "@/types";

export const dynamic = "force-dynamic"; // tentativa vercel

export default async function Home(): Promise<JSX.Element> {
  const initialPageData: PagePessoa = await getPessoas({ pagina: 0, porPagina: 12 });

  return (
    <HomePageClient initialPageData={initialPageData} />
  );
}