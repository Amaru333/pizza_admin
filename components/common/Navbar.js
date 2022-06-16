import React from "react";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function Navbar() {
  const router = useRouter();

  const renderIcon = (icon) => {
    if (icon == "home") return <HomeIcon />;
    if (icon == "add") return <AddCircleIcon />;
  };

  const menu_items = [
    {
      name: "Home",
      icon: "home",
      route: "/",
    },
    {
      name: "Add",
      icon: "add",
      route: "/products/add",
    },
  ];

  return (
    <div className="bg-apptheme-100 text-white h-screen sticky left-0 top-0 flex flex-col justify-center">
      {menu_items.map((item) => (
        <p className="p-2 pl-5 text-base flex hover:bg-apptheme-200 cursor-pointer transition-all" onClick={() => router.push(item.route)}>
          {renderIcon(item.icon)}
          <span className="pl-3">{item.name}</span>
        </p>
      ))}
    </div>
  );
}

export default Navbar;
