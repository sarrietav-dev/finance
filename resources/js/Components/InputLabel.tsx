import { cn } from '@/utils/cn';
import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={cn(
                'block text-xs leading-none font-bold text-gray-500',
                className,
            )}
        >
            {value ? value : children}
        </label>
    );
}
