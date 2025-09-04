import { getPessoaById } from "@/services/pessoaService";
import DetalhesPageClient from "./_components/DetalhesPageClient";

export default async function PessoaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const pessoa = await getPessoaById(Number(id));

    return <DetalhesPageClient pessoa={pessoa} />;
}