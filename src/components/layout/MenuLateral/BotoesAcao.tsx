import { JSX } from "react";

const LimparIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const BuscarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;

interface BotoesAcaoProps {
    onLimpar: () => void;
    onBuscar: () => void;
}

const BotoesAcao = ({ onLimpar, onBuscar }: BotoesAcaoProps): JSX.Element => {
    return (
        <div className="w-full border-t border-gray-200 pt-6 flex flex-col items-center gap-3">
            <button
                onClick={onLimpar}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-lg text-base cursor-pointer bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
            >
                <LimparIcon />
                Limpar Campos
            </button>
            <button
                onClick={onBuscar}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-lg text-base cursor-pointer border-none bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-px transition-all"
            >
                <BuscarIcon />
                Buscar
            </button>
        </div>
    );
};

export default BotoesAcao;