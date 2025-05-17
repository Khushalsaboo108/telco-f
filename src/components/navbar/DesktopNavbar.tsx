import React from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import DarkMode from './DarkMode'
import LinksDropDown from './LinksDropDown'
import CartIcon from './CartIcon'
function DesktopNavbar() {
    return (
        <div className="hidden lg:flex justify-between items-center mx-4 p-6 ">
            <Logo />
            <NavLinks />
            <div className="flex gap-4 items-center">
                <CartIcon />
                <DarkMode />
                <LinksDropDown />
            </div>
        </div>
    )
}

export default DesktopNavbar