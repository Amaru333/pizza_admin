import React from "react";
import { useRouter } from "next/router";
import Navbar from "../common/Navbar";

function AppLayout({ children }) {
  const router = useRouter();

  const NavbarContainer = ({ children }) => {
    return (
      <div className="grid grid-cols-7">
        {/* <div className=""> */}
        <div className="col-span-1">
          <Navbar />
        </div>
        {/* </div> */}
        <div className="col-span-6">
          <div>{children}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <NavbarContainer>{children}</NavbarContainer>
    </>
  );
}

export default AppLayout;
