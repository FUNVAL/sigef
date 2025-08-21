import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();
    const [isOpen, setIsOpen] = useState(false);

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];
    const { icon: Icon, label } = tabs.find(tab => tab.value === appearance) ?? tabs[2];
    const toggleOpen = () => setIsOpen(!isOpen);
    const handleSelect = (value: Appearance) => {
        updateAppearance(value);
        setIsOpen(false);
    }
    return (
        <div className='relative' >
            <button
                className={'flex items-center rounded-md px-4 py-1.5 transition-colors bg-transparent shadow-xs  dark:text-neutral-100'
                }
                onClick={toggleOpen}
            >
                <Icon className="-ml-1 h-4 w-4" />
                <span className="ml-1.5 text-sm">{label}</span>
            </button>
            {isOpen &&
                <div className={cn('gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-32 p-3 absolute z-10 top-10 -left-8', className)} {...props}>
                    {tabs.filter((tab) => tab.value !== appearance).map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            onClick={() => handleSelect(value)}
                            className={cn(
                                'flex items-center rounded-md px-4 py-1.5 transition-colors'
                            )}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}
