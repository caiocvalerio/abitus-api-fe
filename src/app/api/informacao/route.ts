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

    // Adicionado 9,5s de timeout para tentar a requisição, pois a vercel gratuita tem limite de 10s
    // const controller = new AbortController();
    // const timeout = setTimeout(() => controller.abort(), 9500);

    try {
        const formData = await request.formData();
        const ocoId = formData.get('ocoId');
        const informacao = formData.get('informacao');
        const data = formData.get('data');
        const descricao = formData.get('descricao');
        const bodyFormData = new FormData();
        const files = formData.getAll('files');
        const apiUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL + '/v1/ocorrencias/informacoes-desaparecido');

        apiUrl.searchParams.append('ocoId', String(ocoId));
        apiUrl.searchParams.append('informacao', String(informacao));
        apiUrl.searchParams.append('data', String(data));
        apiUrl.searchParams.append('descricao', String(descricao));

        if (files) {
            files.forEach(file => {
                bodyFormData.append('files', file);
            });
        }

        const start = Date.now();

        const apiResponse = await fetch(apiUrl.toString(), {
            method: 'POST',
            body: bodyFormData,
            // signal: controller.signal,
        });

        // clearTimeout(timeout);
        console.log("Tempo total da requisição externa:", Date.now() - start, "ms");

        if (!apiResponse.ok) {
            const errorData = await apiResponse.text();
            throw new Error(`API externa respondeu com erro: ${apiResponse.status} ${errorData}`);
        }

        const responseData = await apiResponse.json();
        return NextResponse.json(responseData);

    } catch (error) {
        // clearTimeout(timeout);

        // if (error instanceof DOMException && error.name === 'AbortError') {
        //     return NextResponse.json(
        //         { message: "A API externa demorou demais para responder. Tente novamente." },
        //         { status: 504 }
        //     );
        // }

        console.error("Erro na API Route:", error);

        return NextResponse.json(
            { message: "Erro interno do servidor ao processar a requisição." },
            { status: 500 }
        );
    }
}