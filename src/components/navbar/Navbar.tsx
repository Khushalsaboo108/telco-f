import React from "react";
import MobileNavebar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-dark-background">
      <DesktopNavbar />
      <MobileNavebar />
    </div>
  );
}

export default Navbar;
