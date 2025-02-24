import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Overview() {
    return (
        <AuthenticatedLayout>
            <Head title="Overview" />

            <div className="space-y-8 px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>

                <div className="space-y-3">
                    <div className="space-y-4 rounded-lg bg-gray-900 p-5 text-white">
                        <p className="text-sm leading-tight">Current balance</p>
                        <p className="text-3xl font-bold">$4,836.00</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900">
                        <p className="text-sm leading-tight">Income</p>
                        <p className="text-3xl font-bold">$3,814.25</p>
                    </div>

                    <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900">
                        <p className="text-sm leading-tight">Expenses</p>
                        <p className="text-3xl font-bold">$1,700.50</p>
                    </div>
                </div>

                <div className="space-y-4 rounded-lg bg-white p-5 text-gray-900">
                    <div>
                        <h2 className="text-xl leading-normal font-bold text-neutral-800">
                            Pots
                        </h2>
                    </div>

                    <div className="bg-beige-100 flex items-center gap-4 rounded-xl px-6 py-5">
                        <div>
                            <img src="/images/icon-pot.svg" alt="" />
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

                    <div className="flex flex-col items-start justify-center gap-4">
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
        </AuthenticatedLayout>
    );
}
