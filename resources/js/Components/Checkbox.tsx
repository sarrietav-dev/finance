import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-sm border-gray-300 text-gray-900 shadow-xs focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
