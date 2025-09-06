import { NextResponse } from 'next/server';

/**
 * Proxy de API para envio de informações acerca de uma pessoa desaparecida.
 * 
 * Esta API Route recebe uma requisição 'multipart/form-data' do cliente,
 * a reconstrói para o formato esperado pela API externa (texto na URL, arquivos no corpo)
 * e a encaminha.
 * 
 * @param request objeto de requisição (Request) recebido do frontend, contendo o FormData.
 * @returns promise que resolve para a resposta da api ou para erro.
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30s de timeout para tentar conseguir enviar a requisição pelo vercel
        const ocoId = formData.get('ocoId');
        const informacao = formData.get('informacao');
        const data = formData.get('data');
        const descricao = formData.get('descricao');
        const bodyFormData = new FormData();
        const files = formData.getAll('files');
        const apiUrl = new URL('https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido');

        apiUrl.searchParams.append('ocoId', String(ocoId));
        apiUrl.searchParams.append('informacao', String(informacao));
        apiUrl.searchParams.append('data', String(data));
        apiUrl.searchParams.append('descricao', String(descricao));

        if (files) {
            files.forEach(file => {
                bodyFormData.append('files', file);
            });
        }

        const apiResponse = await fetch(apiUrl.toString(), {
            method: 'POST',
            body: bodyFormData,
            signal: controller.signal,
        });

        clearTimeout(timeout);

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