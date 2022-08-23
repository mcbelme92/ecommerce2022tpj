import React from "react";
import MenuWeb from "./Menu/Menu";
import TopBar from "./topbar/TopBar";
import NavBar from "./NavBar";
export default function Header() {
  return (
    <div className="header">
      <TopBar />
      <MenuWeb />

      {/* <NavBar /> */}
    </div>
  );
}
