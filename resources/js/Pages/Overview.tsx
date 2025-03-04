import CircularProgressChart from '@/Components/ui/Chart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Overview() {
    return (
        <AuthenticatedLayout>
            <Head title="Overview" />

            <div className="space-y-8 px-4 py-6 md:p-10">
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>

                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-6">
                    <div className="space-y-4 rounded-lg bg-gray-900 p-5 text-white md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Current balance</p>
                        <p className="text-3xl font-bold">$4,836.00</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Income</p>
                        <p className="text-3xl font-bold">$3,814.25</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900 md:p-6 lg:grow">
                        <p className="text-sm leading-tight">Expenses</p>
                        <p className="text-3xl font-bold">$1,700.50</p>
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
                                            $850
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grow flex-col items-start justify-center gap-4">
                                    <div className="flex items-center justify-start gap-4 self-stretch">
                                        <div className="flex shrink grow basis-0 items-center justify-start gap-4">
                                            <div className="w-1 self-stretch rounded-lg bg-teal-700"></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    Savings
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    $159
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4">
                                            <div className="w-1 self-stretch rounded-lg bg-sky-300"></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    Gift
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    $40
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start gap-4 self-stretch">
                                        <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4">
                                            <div className="w-1 self-stretch rounded-lg bg-zinc-500"></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    Concert Ticket
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    $110
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4">
                                            <div className="w-1 self-stretch rounded-lg bg-orange-200"></div>
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <div className="text-xs leading-none font-normal text-stone-500">
                                                    New Laptop
                                                </div>
                                                <div className="text-sm leading-tight font-bold text-neutral-800">
                                                    $10
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
                                        <img
                                            src="/storage/avatars/emma-richardson.jpg"
                                            alt="Phptp of a person"
                                            className="size-8 rounded-full lg:size-10"
                                        />
                                        <span>Emma Richardson</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-green text-sm font-bold">
                                            +$75.50
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            19 Aug 2024
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
                                        <img
                                            src="/storage/avatars/savory-bites-bistro.jpg"
                                            alt="Phptp of a person"
                                            className="size-8 rounded-full lg:size-10"
                                        />
                                        <span>Savory Bites Bistro</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            -$55.50
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            19 Aug 2024
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm font-bold text-gray-900">
                                        <img
                                            src="/storage/avatars/daniel-carter.jpg"
                                            alt="Phptp of a person"
                                            className="size-8 rounded-full lg:size-10"
                                        />
                                        <span>Daniel Carter</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            -$42.30
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            18 Aug 2024
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex grow flex-col gap-6 lg:max-w-lg">
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
                            <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
                                <CircularProgressChart
                                    className="md:grow"
                                    data={[
                                        {
                                            name: 'Entertainment',
                                            value: 50,
                                            color: '#277C78',
                                        },
                                        {
                                            name: 'Bills',
                                            value: 750,
                                            color: '#82C9D7',
                                        },
                                        {
                                            name: 'Dining Out',
                                            value: 75,
                                            color: '#F2CDAC',
                                        },
                                        {
                                            name: 'Personal Care',
                                            value: 100,
                                            color: '#626070',
                                        },
                                    ]}
                                    current={338}
                                    limit={975}
                                />
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                                    {/* <div className="flex items-center justify-start gap-4 self-stretch"> */}
                                    <div className="flex shrink grow basis-0 items-center justify-start gap-4 lg:grow-0">
                                        <div className="bg-green w-1 self-stretch rounded-lg"></div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <div className="text-xs leading-none font-normal text-stone-500">
                                                Entertainment
                                            </div>
                                            <div className="text-sm leading-tight font-bold text-neutral-800">
                                                $50
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4 lg:grow-0">
                                        <div className="bg-cyan w-1 self-stretch rounded-lg"></div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <div className="text-xs leading-none font-normal text-stone-500">
                                                Bills
                                            </div>
                                            <div className="text-sm leading-tight font-bold text-neutral-800">
                                                $750
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    {/* <div className="flex items-center justify-start gap-4 self-stretch"> */}
                                    <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4 lg:grow-0">
                                        <div className="bg-yellow w-1 self-stretch rounded-lg"></div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <div className="text-xs leading-none font-normal text-stone-500">
                                                Dining Out
                                            </div>
                                            <div className="text-sm leading-tight font-bold text-neutral-800">
                                                $75
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex h-11 shrink grow basis-0 items-center justify-start gap-4 lg:grow-0">
                                        <div className="bg-navy w-1 self-stretch rounded-lg"></div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <div className="text-xs leading-none font-normal text-stone-500">
                                                Personal Care
                                            </div>
                                            <div className="text-sm leading-tight font-bold text-neutral-800">
                                                $100
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
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
