import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav>
      <div className="flex pt-6 pb-6 pl-5 bg-purple-700	">
        <p className="text-3xl font-bold text-white mr-12">Metaverse</p>
        <Link to="/" className="mr-10 pt-2 text-white">
          Home
        </Link>

        <Link to="/create-assets" className="mr-10 pt-2 text-white">
          Create Assets
        </Link>

        <Link to="/my-assets" className="mr-10 pt-2 text-white">
          My Assets
        </Link>

        <Link to="/dashboard" className="mr-10 pt-2 text-white">
          Dashboard
        </Link>

        <div className="relative inline-block text-left">
          <div className="cursor-pointer">
            <p
              className="inline-flex justify-center pt-2 text-white"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Category
              <svg
                className="-mr-1  h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </div>

          {showOptions && (
            <div
              className="origin-top-right absolute right-0 z-10 mt-2 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" role="none">
                <Link
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-purple-100"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  to="/images"
                  onClick={handleClick}
                >
                  Images
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-purple-100"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                  to="/music"
                  onClick={handleClick}
                >
                  Music
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
