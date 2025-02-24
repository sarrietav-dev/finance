import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Overview() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800">
                    Overview
                </h2>
            }
        >
            <Head title="Overview" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xs sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to the Overview page!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
