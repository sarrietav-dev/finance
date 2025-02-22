import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-beige-100 flex flex-col lg:flex-row lg:items-center lg:justify-center lg:p-5">
            <div className="relative flex h-16 w-full items-center justify-center rounded-b-lg bg-black lg:h-full lg:rounded-xl">
                <img
                    src="/images/logo-large.svg"
                    alt="Finance logo"
                    className="top-10 left-10 lg:absolute"
                />
                <img
                    src="/images/illustration-authentication.svg"
                    className="hidden lg:block lg:rounded-xl"
                    alt=""
                />
                <div className="absolute bottom-10 left-10 space-y-6">
                    <p className="text-3xl leading-10 font-bold text-white">
                        Keep track of your money
                        <br />
                        and save for your future
                    </p>
                    <p className="text-sm leading-tight font-normal text-white">
                        Personal finance app puts you in control of your
                        spending. Track transactions, set budgets, and add to
                        savings pots easily.
                    </p>
                </div>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-6 sm:pt-0 lg:w-full">
                <div className="mt-6 w-full overflow-hidden rounded-xl bg-white p-8 shadow-md sm:max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
