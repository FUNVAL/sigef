import { SVGProps } from 'react';

interface TieIconProps extends SVGProps<SVGSVGElement> {
    className?: string;
}

export function TieIcon({ className = 'h-5 w-5', ...props }: TieIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Cuello de camisa */}
            <path d="M8 2h8v4l-2 2h-4l-2-2V2z" />
            {/* Nudo de corbata más simple */}
            <path d="M10 6h4v2l-1 1h-2l-1-1V6z" />
            {/* Corbata principal */}
            <path d="M11 9h2l1 11-2 2-2-2 1-11z" />
            {/* Líneas decorativas simples */}
            <path d="M11.5 12v2M11.5 16v2" />
        </svg>
    );
}
