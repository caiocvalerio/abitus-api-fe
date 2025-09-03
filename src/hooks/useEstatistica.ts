import { getEstatistica } from "@/services/pessoaService";
import { EstatisticaPessoaDTO } from "@/types";
import { useEffect, useState } from "react";


export const useEstatistica = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<EstatisticaPessoaDTO | null>(null);


    useEffect(() => {
        const fetchEstatisticas = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getEstatistica();
                setStats(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro desconhecido ao carregar estatísticas.")
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchEstatisticas();
    }, []);

    return { stats, isLoading, error };
}