import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../components/CartContext";
import AuthContext from "../components/AuthContext"; // Assuming AuthContext is imported

const Navbar = ({ toggleSidebar }) => {
  const { getTotalItemCount } = React.useContext(CartContext);
  const { signOut } = React.useContext(AuthContext); // Get signOut function from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    //signOut();
    navigate("/"); // Navigate to the sign-in page after signing out
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="shadow-md bg-gradient-to-r from-green-400 to-blue-500 font-sans tracking-wide relative z-50">
      <section className="flex items-center justify-between py-2 px-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/home">
            <img
              src="https://static.vecteezy.com/system/resources/previews/006/519/666/non_2x/simple-and-stylish-letter-aj-logo-vector.jpg"
              alt="MyLogo"
              className="h-8 w-full"
            />
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-grow mx-4 max-w-lg hidden lg:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full pl-10 pr-4 py-2 rounded-md text-black"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2 w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 4a6 6 0 100 12 6 6 0 000-12z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Notification, Cart, and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <span className="relative">
            <Link to="/notifications">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                className="cursor-pointer fill-white hover:fill-yellow-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 24a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 24zm10.5-8.5h-1V11c0-4.686-3.592-8.518-8.248-8.97V1.5a1.5 1.5 0 0 0-3 0v.53C5.592 2.482 2 6.314 2 11v4.5h-1a1.5 1.5 0 0 0 0 3h20a1.5 1.5 0 0 0 0-3z"
                  data-original="#000000"
                />
              </svg>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-600 px-1 py-0 text-xs text-white">
                3
              </span>
            </Link>
          </span>

          {/* Cart */}
          <span className="relative flex items-center">
            <Link to="/cart" className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                className="cursor-pointer fill-white hover:fill-yellow-500"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.716 0 0 6.716 0 15s6.716 15 15 15h76.471l56.437 254.257c-9.013 6.464-14.908 17.045-14.908 29.086 0 19.299 15.701 35 35 35h.028c19.299-.015 34.972-15.717 34.972-35 0-12.041-5.895-22.622-14.904-29.087ZM475.4 90l-51.428 180H172.859L121.44 90H475.4ZM196 375c-30.327 0-55 24.673-55 55s24.673 55 55 55 55-24.673 55-55-24.673-55-55-55Zm0 80c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25Zm190-80c-30.327 0-55 24.673-55 55s24.673 55 55 55 55-24.673 55-55-24.673-55-55-55Zm0 80c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25Z"
                  data-original="#000000"
                />
              </svg>
              <span className="text-white">Cart</span>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-600 px-1 py-0 text-xs text-white">
                {getTotalItemCount()}
              </span>
            </Link>
          </span>

          {/* Profile with Hover Dropdown */}
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-white focus:outline-none focus:border-yellow-500"
            >
              <img
                className="h-full w-full object-cover"
                src="https://i.pravatar.cc/150?img=68"
                alt="Your avatar"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-100 visible transition-opacity duration-200">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 1 1-8.535 4.914 10 10 0 0 1 8.535-4.914zm4 14h-8a1 1 0 0 0-.835 1.56c1.246 1.563 3.607 3.11 4.835 3.11 1.228 0 3.589-1.547 4.835-3.11a1 1 0 0 0-.835-1.56zM12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 2a3.75 3.75 0 1 1-3.75 3.75A3.751 3.751 0 0 1 12 6z" />
                  </svg>
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 4h-4V2H9v2H5C3.897 4 3 4.897 3 6v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm7 16H8V7h8v13z" />
                  </svg>
                  Orders
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 22a2 2 0 0 1-2-2v-1.72a8.07 8.07 0 0 1-3.09-1.8L4.24 18a2 2 0 0 1-2.84-2.84l1.44-1.44A8.07 8.07 0 0 1 2.72 10H1a2 2 0 0 1 0-4h1.72a8.07 8.07 0 0 1 1.8-3.09L4.18 2.4a2 2 0 1 1 2.84-2.84l1.44 1.44A8.07 8.07 0 0 1 10 1.72V0a2 2 0 0 1 4 0v1.72a8.07 8.07 0 0 1 3.09 1.8l1.44-1.44a2 2 0 0 1 2.84 2.84L20.4 4.18A8.07 8.07 0 0 1 22.28 10H24a2 2 0 0 1 0 4h-1.72a8.07 8.07 0 0 1-1.8 3.09l1.44 1.44a2 2 0 0 1-2.84 2.84l-1.44-1.44A8.07 8.07 0 0 1 14 20.28V22a2 2 0 0 1-2 2zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
                  </svg>
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15 1a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V4.414L5.707 12.707a1 1 0 0 1-1.414 0L2.293 10.707a1 1 0 1 1 1.414-1.414L6 11.586 13.586 4H9a1 1 0 0 1 0-2h7z" />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="block lg:hidden focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-blue-600">
          <ul className="flex flex-col items-center py-2">
            <li>
              <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="block px-4 py-2 text-white hover:bg-blue-700">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block px-4 py-2 text-white hover:bg-blue-700">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/orders" className="block px-4 py-2 text-white hover:bg-blue-700">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block px-4 py-2 text-white hover:bg-blue-700">
                Cart
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-white hover:bg-blue-700"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
