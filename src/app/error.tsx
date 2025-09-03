"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado!</h2>
        <p className="text-slate-600 mb-6">
          Não foi possível carregar as informações. Isso pode ser um problema temporário no servidor.
        </p>
        <button
          onClick={
            () => reset()
          }
          className="px-6 py-3 rounded-lg text-base cursor-pointer border-none bg-blue-950 text-white font-semibold shadow-md hover:brightness-95 hover:-translate-y-px transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}