import { ReactNode } from "react";

interface DottedBackgroundProps {
    children: ReactNode;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({ children }) => {
    return (
        <div className="relative inline-block">
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMinYMin slice"
            >
                <pattern
                    id="dots"
                    x="0"
                    y="0"
                    width="1.5"
                    height="1.5"
                    patternUnits="userSpaceOnUse"
                >
                    <circle
                        cx="0.75"
                        cy="0.75"
                        r="0.2"
                        fill="rgba(102, 102, 102, 0.1)"
                    />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            <div className="relative z-10 p-16">{children}</div>
        </div>
    );
};

export default DottedBackground;
