import { getPessoaById } from "@/services/pessoaService";
import Link from "next/link";
import { formataNome } from "@/utils/formatter";
import Avatar from "@/components/features/pessoas/Avatar";

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2 opacity-60">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);



export default async function PessoaDetalhePage({ params }: { params: { id: string } }) {

    const pessoa = await getPessoaById(Number(params.id));
    const ocorrencia = pessoa.ultimaOcorrencia;
    const isLocalizada = !!pessoa.ultimaOcorrencia?.dataLocalizacao;
    const status = isLocalizada ? 'Localizada' : 'Desaparecida';
    const tagClasses = isLocalizada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 md:p-8">

                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-desenvolve-blue font-semibold hover:underline">
                        <ArrowLeftIcon />
                        Voltar para a busca
                    </Link>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">

                    {/* Cabeçalho */}
                    <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-6 mb-6">
                        <div className="w-36 h-36 md:w-40 md:h-40 flex-shrink-0">
                            <Avatar fotoUrl={pessoa.urlFoto} nome={pessoa.nome ?? 'Desconhecido'} />
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${tagClasses}`}>
                                {status}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{formataNome(pessoa.nome ?? '')}</h1>
                            <p className="text-lg text-slate-500">
                                ID do Registro: {pessoa.id}
                            </p>
                        </div>
                    </div>

                    {/* Informações Pessoais */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Informações Pessoais</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-slate-700">
                            <div>
                                <strong className="block text-gray-500">Data de Nascimento:</strong>
                                <span>{pessoa.dtNascimento ? new Date(pessoa.dtNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Não informado'}</span>
                            </div>
                            <div>
                                <strong className="block text-gray-500">Idade Registrada:</strong>
                                <span>{pessoa.idade != null && pessoa.idade > 0 ? `${pessoa.idade} anos` : 'Não informada'}</span>
                            </div>
                            <div>
                                <strong className="block text-gray-500">Gênero:</strong>
                                <span>{pessoa.sexo || 'Não informado'}</span>
                            </div>
                            <div>
                                <strong className="block text-gray-500">Status Vital:</strong>
                                <span>{typeof pessoa.vivo === 'boolean' ? (pessoa.vivo ? 'Vivo(a)' : 'Em óbito') : 'Não informado'}</span>
                            </div>
                        </div>
                    </div>


                    {/* Detalhes da Ocorrência */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Detalhes do Desaparecimento</h2>
                        {ocorrencia ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-slate-700">
                                <div>
                                    <strong className="block text-gray-500">ID da Ocorrência:</strong>
                                    <span>{ocorrencia.ocoId || '-'}</span>
                                </div>
                                <div>
                                    <strong className="block text-gray-500">Data do Desaparecimento:</strong>
                                    <span>{ocorrencia.dtDesaparecimento ? new Date(ocorrencia.dtDesaparecimento).toLocaleString('pt-BR') : '-'}</span>
                                </div>
                                <div>
                                    <strong className="block text-gray-500">Local do Desaparecimento:</strong>
                                    <span>{ocorrencia.localDesaparecimentoConcat || '-'}</span>
                                </div>

                                {isLocalizada && (
                                    <>
                                        <div>
                                            <strong className="block text-gray-500">Data da Localização:</strong>
                                            <span>{ocorrencia.dataLocalizacao ? new Date(ocorrencia.dataLocalizacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}</span>
                                        </div>
                                        <div>
                                            <strong className="block text-gray-500">Encontrado(a) Vivo(a):</strong>
                                            <span>{typeof ocorrencia.encontradoVivo === 'boolean' ? (ocorrencia.encontradoVivo ? 'Sim' : 'Não') : '-'}</span>
                                        </div>
                                    </>
                                )}

                                <div className="sm:col-span-2">
                                    <strong className="block text-gray-500">Vestimentas na ocasião:</strong>
                                    <span>{ocorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || '-'}</span>
                                </div>
                                <div className="sm:col-span-2">
                                    <strong className="block text-gray-500">Informações Adicionais:</strong>
                                    <p className="italic text-gray-600 mt-1">{ocorrencia.ocorrenciaEntrevDesapDTO?.informacao || 'Nenhuma informação adicional registrada.'}</p>
                                </div>

                                {ocorrencia.listaCartaz && ocorrencia.listaCartaz.length > 0 && (
                                    <div className="sm:col-span-2">
                                        <strong className="block text-gray-500 mb-2">Cartazes de Divulgação:</strong>
                                        <div className="flex flex-wrap gap-4">
                                            {ocorrencia.listaCartaz.map((cartaz, index) => (
                                                cartaz.urlCartaz &&
                                                <a key={index} href={cartaz.urlCartaz} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm font-semibold">
                                                    {cartaz.tipoCartaz?.replace(/_/g, ' ') || `Cartaz ${index + 1}`}
                                                    <LinkIcon />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-slate-500">Nenhuma ocorrência associada a esta pessoa.</p>
                        )}
                    </div>

                    {/* Botão para Adicionar Informação */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button className="w-full h-12 flex items-center justify-center gap-2 rounded-lg text-base cursor-pointer border-none bg-gradient-to-r from-desenvolve-blue-secondary to-desenvolve-blue-dark text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-px transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Tenho uma informação
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}