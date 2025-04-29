import React from "react";
import SignUpButton from "./SignUpButton";
const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" />
        <h1 className="text-xl font-bold font-mono">Rent-car</h1>
      </div>
      <div className="flex font-mono font-bold transition duration-300  items-center gap-2">
        <a href="" className="hover:text-gray-300 hover:underline decoration-2">
          Home
        </a>
        <a
          href=""
          className="hover:text-gray-300hover:underline decoration-2  hover:underline decoration-2"
        >
          Services
        </a>
        <a href="" className="hover:text-gray-300 hover:underline decoration-2">
          Contact
        </a>
        <a href="" className="hover:text-gray-300 hover:underline decoration-2">
          About
        </a>
      </div>
      <div className="flex items-center gap-2">
        <button className="border hover:bg-white hover:text-black transition duration-300 text-white px-4 py-2 rounded-md" >
          Sign In
        </button>
        <SignUpButton />
      </div>
    </header>
  );
};

export default Header;
