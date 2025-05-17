import React from 'react';

interface BackgroundWrapperProps {
    children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
    return (
        <div className="relative w-full lg:h-[384px] h-[456px] py-20 flex items-center justify-center text-center">
            <div
                className="absolute inset-0 bg-cover bg-center dark:hidden light-background-image"
            // style={{ backgroundImage: `url(/gradBackground-light.png)` }}
            ></div>

            <div
                className="absolute inset-0 bg-cover hidden dark:block dark-background-image"
            // style={{ backgroundImage: `url(/gradBackground-dark.png)` }}
            ></div>

            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default BackgroundWrapper;
