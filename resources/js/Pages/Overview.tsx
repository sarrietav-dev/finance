import CircularProgressChart from '@/Components/ui/Chart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type OverviewProps = {
    transactions: Array<{
        id: number;
        avatar: string;
        name: string;
        date: string;
        amount: number;
    }>;
    currentBalance: number;
    income: number;
    expenses: number;
    pots: Array<{
        id: number;
        user_id: number;
        created_at: string | null;
        updated_at: string | null;
        name: string;
        target: number;
        total: number;
        theme: string;
    }>;
    pots_total: number;
    budgets: Array<{
        category: string;
        maximum: number;
        theme: string;
        amount: number;
    }>;
};

export default function Overview({
    pots,
    transactions,
    budgets,
    currentBalance,
    expenses,
    income,
    pots_total,
}: OverviewProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Overview" />

            <div className="container mx-auto space-y-8 px-4 py-6 md:p-10">
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>

                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-6">
                    <div className="space-y-4 rounded-lg bg-gray-900 p-5 text-white md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Current balance</p>
                        <p className="text-3xl font-bold">${currentBalance}</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Income</p>
                        <p className="text-3xl font-bold">${income}</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Expenses</p>
                        <p className="text-3xl font-bold">${expenses}</p>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-6 lg:flex-row">
                    <div className="flex grow flex-col gap-6">
                        <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Pots
                                </h2>
                                <Link
                                    href="/pots"
                                    className="flex items-center gap-3 text-sm text-gray-500 hover:underline"
                                >
                                    <span>See details</span>
                                    <IconPhCaretRightFill />
                                </Link>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                                <div className="bg-beige-100 flex grow items-center gap-4 rounded-xl px-6 py-5">
                                    <div>
                                        <img
                                            src="/images/icon-pot.svg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex grow flex-col items-start justify-start gap-3">
                                        <div className="flex items-center justify-start gap-2.5">
                                            <div className="text-sm leading-tight font-normal text-gray-500">
                                                Total Saved
                                            </div>
                                        </div>
                                        <div className="text-3xl leading-10 font-bold text-gray-900">
                                            ${pots_total}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    {pots.map((pot) => (
                                        <div
                                            key={pot.id}
                                            className="flex items-center justify-start gap-4"
                                        >
                                            <div
                                                className="w-1 self-stretch rounded-lg"
                                                style={{
                                                    backgroundColor: pot.theme,
                                                }}
                                            ></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    {pot.name}
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    ${pot.total}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-8 lg:grow">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Transactions
                                </h2>
                                <Link
                                    href="/transactions"
                                    className="flex items-center gap-3 text-sm text-gray-500 hover:underline"
                                >
                                    <span>View All</span>
                                    <IconPhCaretRightFill />
                                </Link>
                            </div>
                            <ul className="divide-y divide-gray-200 *:py-7 last:!pb-0 lg:*:py-5">
                                {transactions.map((transaction) => (
                                    <li
                                        key={transaction.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
                                            <img
                                                src={transaction.avatar}
                                                alt="Phptp of a person"
                                                className="size-8 rounded-full lg:size-10"
                                            />
                                            <span>{transaction.name}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span
                                                className={`text-sm font-bold ${
                                                    transaction.amount > 0
                                                        ? 'text-green'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {transaction.amount > 0
                                                    ? `+$${transaction.amount}`
                                                    : `-$${Math.abs(
                                                          transaction.amount,
                                                      )}`}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                19 Aug 2024
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex grow flex-col gap-6 lg:max-w-xl">
                        <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Budgets
                                </h2>
                                <Link
                                    href={route('budgets')}
                                    className="flex items-center gap-3 text-sm text-gray-500 hover:underline"
                                >
                                    <span>See details</span>
                                    <IconPhCaretRightFill />
                                </Link>
                            </div>
                            <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
                                <CircularProgressChart
                                    className="md:grow"
                                    data={budgets}
                                    current={338}
                                    limit={975}
                                />
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                                    {budgets.map((budget) => (
                                        <div
                                            key={budget.category}
                                            className="flex items-center justify-start gap-4"
                                        >
                                            <div
                                                className="w-1 self-stretch rounded-lg"
                                                style={{
                                                    backgroundColor:
                                                        budget.theme,
                                                }}
                                            ></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    {budget.category}
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    ${budget.amount}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Recurring bills
                                </h2>
                                <Link
                                    href="/bills"
                                    className="flex items-center gap-3 text-sm text-gray-500 hover:underline"
                                >
                                    <span>See details</span>
                                    <IconPhCaretRightFill />
                                </Link>
                            </div>
                            <ul className="space-y-3">
                                <li className="bg-beige-100 border-green flex items-center justify-between rounded-lg border-l-4 px-4 py-5">
                                    <span className="text-sm text-gray-500">
                                        Paid bills
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        $190.00
                                    </span>
                                </li>
                                <li className="bg-beige-100 border-yellow flex items-center justify-between rounded-lg border-l-4 px-4 py-5">
                                    <span className="text-sm text-gray-500">
                                        Total Upcoming
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        $190.00
                                    </span>
                                </li>
                                <li className="bg-beige-100 border-cyan flex items-center justify-between rounded-lg border-l-4 px-4 py-5">
                                    <span className="text-sm text-gray-500">
                                        Due Soon
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        $190.00
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
