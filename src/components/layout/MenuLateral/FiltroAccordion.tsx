import React, { JSX } from 'react';

const ChevronIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

interface FiltroAccordionProps {
    title: string;
    children: React.ReactNode;
}

const FiltroAccordion = ({ title, children }: FiltroAccordionProps): JSX.Element => {
    return (
        <details className="group overflow-hidden rounded-lg border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition hover:bg-gray-50">
                <span className="text-sm font-medium">{title}</span>
                <span className="transition duration-300 group-open:-rotate-180">
                    <ChevronIcon />
                </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
                {children}
            </div>
        </details>
    );
};

export default FiltroAccordion;