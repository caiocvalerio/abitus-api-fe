import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const ocoId = formData.get('ocoId');
        const informacao = formData.get('informacao');
        const data = formData.get('data');
        const descricao = formData.get('descricao');

        const apiUrl = new URL('https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido');
        apiUrl.searchParams.append('ocoId', String(ocoId));
        apiUrl.searchParams.append('informacao', String(informacao));
        apiUrl.searchParams.append('data', String(data));
        apiUrl.searchParams.append('descricao', String(descricao));

        const bodyFormData = new FormData();
        const files = formData.getAll('files');
        if (files) {
            files.forEach(file => {
                bodyFormData.append('files', file);
            });
        }

        const apiResponse = await fetch(apiUrl.toString(), {
            method: 'POST',
            body: bodyFormData,
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.text();
            throw new Error(`API externa respondeu com erro: ${apiResponse.status} ${errorData}`);
        }

        const responseData = await apiResponse.json();
        return NextResponse.json(responseData);

    } catch (error) {
        console.error("Erro na API Route:", error);
        return NextResponse.json({ message: "Erro interno do servidor ao processar a requisição." }, { status: 500 });
    }
}