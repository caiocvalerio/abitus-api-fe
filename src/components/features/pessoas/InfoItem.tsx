import React from 'react';

interface InfoItemProps {
    label: string;
    value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="text-slate-600">{label}:</span>
        <span className="font-semibold text-slate-800">{value}</span>
    </div>
);

export default InfoItem;