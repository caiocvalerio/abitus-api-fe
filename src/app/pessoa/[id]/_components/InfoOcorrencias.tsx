import type { Ocorrencia } from "@/types";
import Link from "next/link";

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2 opacity-60">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

interface InfoOcorrenciaProps {
    ocorrencia: Ocorrencia | undefined | null;
    isLocalizada: boolean;
}

const InfoOcorrencia: React.FC<InfoOcorrenciaProps> = ({ ocorrencia, isLocalizada }) => (
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
);

export default InfoOcorrencia;