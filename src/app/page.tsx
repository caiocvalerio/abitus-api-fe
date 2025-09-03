import { getPessoas } from "@/services/pessoaService";
import HomePageClient from "./_components/HomePageClient";

export default async function Home() {
  const initialPageData = await getPessoas({ pagina: 0, porPagina: 12 });

  return (
    <HomePageClient initialPageData={initialPageData} />
  );
}