"use client";

import { JSX, useState } from 'react';
import Image from 'next/image';


interface AvatarProps {
    fotoUrl: string | null | undefined;
    nome: string;
}

const Avatar = ({ fotoUrl, nome }: AvatarProps): JSX.Element => {
    const [imageError, setImageError] = useState(false);
    const iniciais = nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    const handleImageError = () => {
        setImageError(true);
    };

    if (imageError || !fotoUrl) {
        return (
            <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center mx-auto shadow-md">
                <span className="text-3xl font-semibold text-slate-500">{iniciais}</span>
            </div>
        );
    }
    
    return (
        <Image
            src={fotoUrl}
            onError={handleImageError}
            alt={`Foto de ${nome}`}
            width={96}
            height={96}
            className="w-40 h-40 rounded-full object-cover mx-auto shadow-md border-4 border-white"
        />
    );
};

export default Avatar;