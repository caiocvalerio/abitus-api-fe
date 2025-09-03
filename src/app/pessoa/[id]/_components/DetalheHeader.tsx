import Avatar from "@/components/features/pessoas/Avatar";
import type { PessoaResumo } from "@/types";
import { formataNome } from "@/utils/formatter";

interface DetalheHeaderProps {
    pessoa: PessoaResumo;
    status: string;
    tagClasses: string;
}

const DetalheHeader: React.FC<DetalheHeaderProps> = ({ pessoa, status, tagClasses }) => (
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
);

export default DetalheHeader;