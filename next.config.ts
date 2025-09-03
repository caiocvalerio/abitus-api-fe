import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // O protocolo da URL da imagem
        hostname: 's3dev.pjc.mt.gov.br', // O domínio que você quer autorizar
        port: '', // Deixe vazio para a porta padrão
        pathname: '/**', // Permite qualquer caminho de imagem dentro desse domínio
      },
    ],
  },
};

export default nextConfig;
