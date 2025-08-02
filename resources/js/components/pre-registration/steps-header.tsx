import { CardHeader } from "../ui/card"

interface StepsHeaderProps {
    title: string
    subtitle: string
    className?: string
}

export function StepsHeader({ title, subtitle }: StepsHeaderProps) {
    return (
        <CardHeader className="min-h-54 bg-[#2a7de1] grid place-content-center text-center rounded-t-lg p-8">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white">{title}</h1>
            <p className="text-base sm:text-lg text-gray-100">{subtitle}</p>
        </CardHeader>
    )
}
