import useMenuCollapse from '@/hooks/useMenuCollapse';
import { cn } from '@/utils/cn';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { collapsed, toggleMenu } = useMenuCollapse();

    return (
        <div className="min-h-screen lg:flex lg:items-stretch">
            <nav
                className={cn(
                    'fixed bottom-0 left-0 z-10 w-full rounded-t-lg bg-gray-900 px-10 pt-2 transition-all duration-300 lg:top-0 lg:bottom-auto lg:h-screen lg:w-75 lg:rounded-t-none lg:rounded-r-lg lg:px-6 lg:py-10 lg:pl-0',
                    collapsed && 'collapsed group lg:w-27 lg:px-4 lg:pl-0',
                )}
            >
                <ul className="flex justify-between text-gray-300 lg:h-full lg:flex-col">
                    <div className="relative mb-16 hidden w-40 cursor-pointer flex-row items-center justify-start gap-2 border-l-4 border-l-transparent py-4 transition-all group-[.collapsed]:w-24 lg:flex">
                        <img
                            className="absolute inset-0 left-8 h-full w-full opacity-100 transition-all duration-300 group-[.collapsed]:translate-y-full group-[.collapsed]:opacity-0"
                            src="/images/logo-large.svg"
                            alt=""
                        />
                        <img
                            className="absolute inset-0 h-full w-full opacity-0 transition-all duration-300 group-[.collapsed]:translate-y-0 group-[.collapsed]:opacity-100"
                            src="/images/logo-small.svg"
                            alt=""
                        />
                    </div>
                    <NavItem
                        icon="icon-nav-overview.svg"
                        label="Overview"
                        active={route().current() === 'overview'}
                        href={route('overview')}
                    />
                    <NavItem
                        icon="icon-nav-transactions.svg"
                        label="Transaction"
                        active={route().current() === 'transactions'}
                        href={route('transactions')}
                    />
                    <NavItem
                        icon="icon-nav-budgets.svg"
                        label="Budgets"
                        active={route().current() === 'budgets'}
                        href={route('budgets')}
                    />
                    <NavItem
                        icon="icon-nav-pots.svg"
                        label="Pots"
                        active={route().current() === 'pots'}
                        href={route('pots')}
                    />
                    <NavItem
                        icon="icon-nav-recurring-bills.svg"
                        label="Recurring Bills"
                        active={route().current() === 'bills'}
                        href={route('bills')}
                    />
                    <li
                        onClick={() => toggleMenu()}
                        className="mt-auto hidden cursor-pointer flex-row items-center justify-start gap-2 border-l-4 border-l-transparent px-8 py-4 lg:flex"
                    >
                        <img
                            className="size-6 transition group-[.collapsed]:rotate-180"
                            src="/images/icon-minimize-menu.svg"
                        />
                        <span className="hidden truncate text-right leading-none font-bold group-[.collapsed]:hidden md:block lg:text-left">
                            Minimize Menu
                        </span>
                    </li>
                </ul>
            </nav>
            <main
                className={cn(
                    'mb-16 transition-all duration-300 lg:mb-0 lg:ml-75 lg:grow',
                    collapsed && 'lg:ml-27',
                )}
            >
                {children}
            </main>
        </div>
    );
}

function NavItem({
    icon,
    label,
    className,
    active,
    href,
}: {
    icon: string;
    label: string;
    className?: string;
    active?: boolean;
    href: string;
}) {
    return (
        <Link
            as="li"
            href={href}
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
                    'hidden truncate text-right leading-none font-bold group-[.collapsed]:hidden md:!block lg:text-left',
                    active && 'text-gray-900',
                )}
            >
                {label}
            </span>
        </Link>
    );
}
