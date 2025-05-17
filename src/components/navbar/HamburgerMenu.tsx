"use client";
import { navlinks } from "@/utils/links/nav-links";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                className="p-4 focus:outline-none z-[1001] relative"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                <div className="relative h-6 w-6">
                    <span
                        className={`absolute left-0 w-6 h-px ${theme === "dark" ? "bg-white" : "bg-dark-background"}  transition-all duration-300 ${isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"
                            }`}
                    ></span>
                    <span
                        className={`absolute left-0 w-6 h-px ${theme === "dark" ? "bg-white" : "bg-dark-background"} transition-all duration-300 ${isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                            }`}
                    ></span>
                    <span
                        className={`absolute left-0 w-6 h-px ${theme === "dark" ? "bg-white" : "bg-dark-background"} transition-all duration-300 ${isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-0"
                            }`}
                    ></span>
                </div>
            </button>

            {/* Full-Width Menu */}
            <div
                id="mobile-menu"
                className={`fixed top-[104px] left-0 w-screen ${theme === "dark" ? "bg-dark-background" : "bg-white"} z-[1000] shadow-md transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
            >
                {isOpen && (
                    <nav className="py-4">
                        <ul className="text-start  space-y-4 text-lg font-semibold">
                            {navlinks.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li
                                        key={index}
                                        className="border-b-2 py-2 pt-0 p-commonPadding"
                                    >
                                        <Link
                                            href={item.href}
                                            className={`text-base 
                                                        transition-colors
                                                        ${isActive
                                                    ? "bg-gradient-to-r from-[#00A8E8] to-[#00D084] bg-clip-text text-transparent font-semibold"
                                                    : "text-black dark:text-white font-normal hover:bg-gradient-to-r hover:from-[#00A8E8] hover:to-[#00D084] hover:bg-clip-text hover:text-transparent dark:hover:text-transparent"
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default HamburgerMenu;
