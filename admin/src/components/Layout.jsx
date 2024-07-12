import React, { Children, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarAnim, setSidebarAnim] = useState(true);

  return (
    <div className="flex">
      <div
        className={`absolute md:relative bg-[#8c92ac] h-screen w-1/6 p-3 ${
          sidebarAnim ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <Sidebar sidebarAnim={sidebarAnim} setSidebarAnim={setSidebarAnim} />
      </div>
      <div className="flex-1">
        <Navbar sidebarAnim={sidebarAnim} setSidebarAnim={setSidebarAnim} />
        <div className="w-11/12 mx-auto mt-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
