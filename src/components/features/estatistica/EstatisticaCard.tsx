import React from 'react';

interface EstatisticaCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: 'red' | 'green';
}

const StatCard: React.FC<EstatisticaCardProps> = ({ icon, title, value, color }) => {
    const colorClasses = {
        red: { bg: 'bg-red-100', text: 'text-red-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
    };
    const selectedColor = colorClasses[color];

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 flex-1">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${selectedColor.bg}`}>
                <div className={selectedColor.text}>{icon}</div>
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-sm text-slate-500">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;