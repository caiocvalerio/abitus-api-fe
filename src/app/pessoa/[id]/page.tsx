import { getPessoaById } from "@/services/pessoaService";
import DetalhesPageClient from "./_components/DetalhesPageClient";
import { JSX } from "react";

export default async function PessoaDetalhePage({ params }: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
    const id = (await params).id;
    const pessoa = await getPessoaById(Number(id));
    return <DetalhesPageClient pessoa={pessoa} />;
}