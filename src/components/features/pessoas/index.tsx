"use client";

import type { PessoaResumo } from '@/types';
import { formataNome } from '@/utils/formatter';
import Avatar from './Avatar';
import InfoItem from './InfoItem';
import { JSX } from 'react';

interface PessoaCardProps {
    pessoa: PessoaResumo;
}

const PessoaCard = ({ pessoa }: PessoaCardProps): JSX.Element => {
    const isLocalizada = !!pessoa.ultimaOcorrencia?.dataLocalizacao;
    const status = isLocalizada ? 'Localizada' : 'Desaparecida';
    const tagClasses = isLocalizada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const vivoStatus = typeof pessoa.vivo === 'boolean' ? (pessoa.vivo ? 'Sim' : 'Não') : ' - ';

    return (
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col">
            <Avatar fotoUrl={pessoa.urlFoto} nome={pessoa.nome ?? 'Desconhecido'} />

            <div className="text-center mt-4 flex-grow">
                <h2 className="text-lg font-bold text-slate-900">{formataNome(pessoa.nome ?? '')}</h2>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-sm space-y-2">
                <InfoItem label="Idade" value={pessoa.idade || '-'} />
                <InfoItem label="Gênero" value={pessoa.sexo || '-'} />
                <InfoItem label="Vivo(a)" value={vivoStatus} />
            </div>

            <div className="text-center mt-6">
                <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${tagClasses}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

export default PessoaCard;