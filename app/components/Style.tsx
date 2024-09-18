import React from 'react';

interface StyleProps {
    children: React.ReactNode;
}

const Style: React.FC<StyleProps> = ({ children }) => {


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12">
            <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <ul className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6 border-b border-gray-300 bg-gray-800 bg-opacity-60 shadow-2xl backdrop-blur-lg p-6 lg:rounded-2xl lg:border lg:shadow-3xl lg:dark:bg-gray-900/30 transition-transform duration-300 ease-in-out">
                    {children}
                </ul>
            </div>
        </main>
    );
};



export default Style;