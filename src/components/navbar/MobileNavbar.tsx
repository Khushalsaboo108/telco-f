import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LinksDropDown from "./LinksDropDown";
import DarkMode from "./DarkMode";
import HamburgerMenu from "./HamburgerMenu";

function MobileNavebar() {
    return (
        <div className="flex lg:hidden justify-between items-center mx-4 p-6">
            <Logo />
            <div className="flex gap-4 justify-center items-center">
                <DarkMode />
                <HamburgerMenu />
            </div>
        </div>
    );
}

export default MobileNavebar;
