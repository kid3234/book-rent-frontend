import React from "react";
import { useLocation } from "react-router-dom";

function NaveBar() {
  const location = useLocation();

  const path = location.pathname.split("/")[2];
  const role = localStorage.getItem('role')

  return (
    <div className="w-[60%] lg:w-[80%] px-10 py-2 rounded-lg fixed top-4 right-10 bg-white m-auto z-50 ">
      <p className="font-bold text-lg">{role === 'admin' ? "Admin" : "Owner"}<span className="font-normal">/{path}</span>{" "}</p>
    </div>
  );
}

export default NaveBar;
