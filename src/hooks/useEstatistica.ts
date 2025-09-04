import { getEstatisticas } from "@/services/pessoaService";
import { EstatisticaPessoaDTO } from "@/types";
import { useEffect, useState } from "react";

type UseEstatisticaReturn = {
    stats: EstatisticaPessoaDTO | null;
    isLoading: boolean;
}

export const useEstatistica = (): UseEstatisticaReturn => {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<EstatisticaPessoaDTO | null>(null);


    useEffect(() => {
        const fetchEstatisticas = async () => {
            try {
                const data = await getEstatisticas();
                setStats(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Falha ao carregar estatísticas:", error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchEstatisticas();
    }, []);

    return { stats, isLoading };
}