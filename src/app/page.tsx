import { getPessoas } from "@/services/pessoaService";
import HomePageClient from "./_components/HomePageClient";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const initialPageData = await getPessoas({ pagina: 0, porPagina: 12 });

  return (
    <HomePageClient initialPageData={initialPageData} />
  );
}