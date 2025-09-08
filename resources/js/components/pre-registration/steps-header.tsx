import { CardHeader } from '../ui/card';

interface StepsHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function StepsHeader({ title, subtitle = '' }: StepsHeaderProps) {
    return (
        <CardHeader className="grid min-h-44 place-content-center rounded-t-lg bg-[#2a7de1] p-4 text-center sm:min-h-54 sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{title}</h1>
            <p className="text-base text-gray-100 sm:text-lg">{subtitle}</p>
        </CardHeader>
    );
}
