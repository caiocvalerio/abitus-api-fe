"use client";

import { JSX, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { adicionarInformacaoOcorrencia } from '@/services/pessoaService';

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>;

interface FormularioModalProps {
    isOpen: boolean;
    onClose: () => void;
    ocoId: number | undefined;
}

const FormularioModal = ({ isOpen, onClose, ocoId }: FormularioModalProps): JSX.Element => {
    const [informacao, setInformacao] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ocoId) {
            toast.error("ID da ocorrência não encontrado.");
            return;
        }
        
        setIsSubmitting(true);
        const loadingToast = toast.loading('Enviando informação...');

        try {
            await adicionarInformacaoOcorrencia({
                ocoId,
                informacao,
                data,
                descricao,
                files,
            });
            
            toast.dismiss(loadingToast);
            toast.success('Informação enviada com sucesso!');
        
            onClose();

            // Limpa o formulário
            setInformacao('');
            setData('');
            setDescricao('');
            setFiles(null);

            const fileInput = document.getElementById('files') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error) {
            toast.dismiss(loadingToast);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Ocorreu um erro desconhecido.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={onClose} // Fecha o modal ao clicar no fundo
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative"
                        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
                            <CloseIcon />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Adicionar Nova Informação</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="data" className="block text-sm font-medium text-slate-700 mb-1">Data em que viu a pessoa*</label>
                                <input
                                    type="date"
                                    id="data"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="informacao" className="block text-sm font-medium text-slate-700 mb-1">Informações sobre o que viu*</label>
                                <textarea
                                    id="informacao"
                                    rows={4}
                                    value={informacao}
                                    onChange={(e) => setInformacao(e.target.value)}
                                    placeholder="Ex: Foi vista em Cuiabá na rua ABC, utilizando saia rosa..."
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="files" className="block text-sm font-medium text-slate-700 mb-1">Anexar fotos ou vídeos (opcional)</label>
                                <input
                                    type="file"
                                    id="files"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                             <div>
                                <label htmlFor="descricao" className="block text-sm font-medium text-slate-700 mb-1">Descrição do anexo*</label>
                                <input
                                    type="text"
                                    id="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Ex: Foto tirada no centro da cidade"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-6 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 font-semibold">
                                    Cancelar
                                </button>
                                <button type="submit" className="px-6 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-800 font-semibold">
                                    Enviar Informação
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormularioModal;