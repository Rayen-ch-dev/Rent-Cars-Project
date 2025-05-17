import React from "react";

const Button = () => {
  return (
    <div>
      <Link
        href="login"
        className="border hover:bg-white hover:text-black transition duration-300 text-white mr-4 px-4 py-2 rounded-md"
      >
        Sing In
      </Link>
    </div>
  );
};

export default Button;
