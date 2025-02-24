import { cn } from '@/utils/cn';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 lg:flex lg:items-stretch">
            <nav
                className={cn(
                    'fixed bottom-0 left-0 w-full rounded-t-lg bg-gray-900 px-10 pt-2 transition-all duration-300 lg:relative lg:top-0 lg:bottom-auto lg:w-75 lg:rounded-t-none lg:rounded-r-lg lg:px-6 lg:py-4 lg:pl-0',
                    collapsed && 'collapsed group lg:w-27 lg:px-4 lg:pl-0',
                )}
            >
                <ul className="flex justify-between text-gray-300 lg:h-full lg:flex-col">
                    <NavItem
                        icon="icon-nav-overview.svg"
                        label="Overview"
                        active
                    />
                    <NavItem
                        icon="icon-nav-transactions.svg"
                        label="Transaction"
                    />
                    <NavItem icon="icon-nav-budgets.svg" label="Budget" />
                    <NavItem icon="icon-nav-pots.svg" label="Pots" />
                    <NavItem
                        icon="icon-nav-recurring-bills.svg"
                        label="Recurring Bills"
                    />
                    <li
                        onClick={() => setCollapsed(!collapsed)}
                        className="mt-auto hidden cursor-pointer flex-row items-center justify-start gap-2 border-l-4 border-l-transparent px-8 py-4 lg:flex"
                    >
                        <img
                            className="size-6 transition group-[.collapsed]:rotate-180"
                            src="/images/icon-minimize-menu.svg"
                        />
                        <span className="hidden text-right leading-none font-bold group-[.collapsed]:hidden md:block lg:text-left">
                            Minimize Menu
                        </span>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
}

function NavItem({
    icon,
    label,
    className,
    active,
}: {
    icon: string;
    label: string;
    className?: string;
    active?: boolean;
}) {
    return (
        <li
            className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-t-lg border-b-4 border-b-transparent px-5 py-4 lg:flex-row lg:justify-start lg:rounded-t-none lg:rounded-r-lg lg:border-b-0 lg:border-l-4 lg:px-8 lg:py-4',
                !active && 'border-b-transparent lg:border-l-transparent',
                active && 'border-b-green lg:border-l-green bg-white',
                className,
            )}
        >
            <img className="size-6" src={`/images/${icon}`} alt="" />
            <span
                className={cn(
                    'hidden text-right leading-none font-bold group-[.collapsed]:hidden md:block lg:text-left',
                    active && 'text-gray-900',
                )}
            >
                {label}
            </span>
        </li>
    );
}
