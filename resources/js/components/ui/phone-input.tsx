import React from 'react';
import { Input } from './input';
import { Country } from '@/types/country';

// Usa el tipo correcto para props de input HTML
type PhoneInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    countries: Country[];
    dependency?: number;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ countries, dependency, className, ...rest }) => {
    const phoneCode = () => {
        const selectedCountry = countries.find(c => c.id === dependency);
        return selectedCountry
            ? `${selectedCountry.code} (${selectedCountry.phone_code})`
            : "+1 (USA)";
    };

    return (
        <div className="flex">
            <span className='grid place-content-center border w-36 border-r-0 rounded-l-md bg-gray-100 text-sm'>
                {phoneCode()}
            </span>
            <Input
                {...rest}
                className={`rounded-l-none ${className ?? ''}`}
            />
        </div>
    );
};

export default PhoneInput;
