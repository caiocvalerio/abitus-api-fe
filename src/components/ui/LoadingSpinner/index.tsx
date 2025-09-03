const LoadingSpinner = () => {
  return (
    // As classes do spinnerContainer foram convertidas para utilitários de posicionamento absoluto
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" aria-label="Carregando...">
      
      {/* As classes do spinner foram convertidas para utilitários de tamanho, borda e animação */}
      <div className="w-[50px] h-[50px] rounded-full border-[5px] border-gray-200 border-t-blue-600 animate-spin"></div>
    
    </div>
  );
};
export default LoadingSpinner;
