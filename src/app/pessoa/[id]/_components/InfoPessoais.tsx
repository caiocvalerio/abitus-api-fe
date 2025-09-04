import type { PessoaResumo } from "@/types";
import { JSX } from "react";

interface InfoPessoaisProps {
    pessoa: PessoaResumo;
}

const InfoPessoais = ({ pessoa }: InfoPessoaisProps): JSX.Element => {
    return (
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
    );
}

export default InfoPessoais;