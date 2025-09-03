const BotaoAcao = () => (
    <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full h-12 flex items-center justify-center gap-2 rounded-lg text-base cursor-pointer border-none bg-blue-950 text-white font-semibold shadow-md hover:bg-blue-800 hover:-translate-y-px transition-all">
            <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tenho uma informação
        </button>
    </div>
);

export default BotaoAcao;