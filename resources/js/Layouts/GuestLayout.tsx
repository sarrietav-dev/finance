import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto flex max-w-[2000px] flex-col lg:h-screen lg:w-screen lg:flex-row lg:p-6">
            <div className="relative flex h-16 w-full items-center justify-center rounded-b-lg bg-black lg:h-full lg:w-1/2 lg:rounded-xl">
                <img
                    src="/images/logo-large.svg"
                    alt="Finance logo"
                    className="top-10 left-10 z-10 lg:absolute"
                />
                <img
                    src="/images/illustration-authentication.svg"
                    className="absolute inset-0 hidden h-full w-full object-cover lg:block lg:rounded-xl"
                    alt=""
                />
                <div className="absolute bottom-10 left-10 hidden space-y-6 p-4 lg:block">
                    <p className="text-2xl leading-8 font-bold text-white">
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
            <div className="flex w-full flex-col items-center justify-center self-center px-4 pt-6 sm:pt-0 lg:max-h-150">
                <div className="mt-6 h-full w-full overflow-hidden rounded-xl bg-white p-8 shadow-md sm:max-w-md lg:m-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
