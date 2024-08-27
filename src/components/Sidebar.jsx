import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  ClipboardListIcon,
  CurrencyDollarIcon,
  CogIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";

const Sidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section) => {
    setActiveComponent(section);
    setActiveSection(section);
  };

  const handleSettingsClick = () => {
    handleSectionClick("profile");
  };

  const renderButton = (section, Icon, label) => (
    <Link
      to={`/${section}`}
      onClick={() => handleSectionClick(section)}
      className={`flex items-center p-2 space-x-2 rounded-md hover:bg-green-700 transition-colors duration-300
        ${
          activeSection === section
            ? "bg-gray-900 text-white border-l-2 border-green-500"
            : "text-gray-400"
        }`}
      title={label}
    >
      <Icon className="w-6 h-6" />
      <span className={`text-base ${!isOpen && "hidden"}`}>{label}</span>
    </Link>
  );

  return (
    <div
      className={`flex flex-col h-full p-3 bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-full md:w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${!isOpen && "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 animate-pulse text-green-500"
            title="Vendor"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
            <path
              d="M8 14l4-4 4 4m0 0l-4 4-4-4"
              fill="none"
              stroke="currentColor"
            ></path>
          </svg>
          <h1 className="text-lg font-bold">Coustmer</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md focus:outline-none focus:ring"
        >
          {isOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex flex-col mt-6 space-y-2 overflow-auto">
        {renderButton("home", HomeIcon, "Home")}
        {renderButton("products", CubeIcon, "Products")}
        {renderButton("payment", CurrencyDollarIcon, "Payment")}
        {renderButton("orders", ClipboardListIcon, "Order Tracking")}
        {/* {renderButton("invoice-and-payments", CurrencyDollarIcon, "Invoice and Payments")} */}
      </div>
      <div className="mt-auto">
        <Link
          to="/"
          onClick={handleSettingsClick}
          className={`flex items-center p-2 space-x-2 rounded-md hover:bg-green-700 transition-colors duration-300
            ${
              activeSection === "profile"
                ? "bg-gray-900 text-white border-l-4 border-green-500"
                : "text-gray-400"
            }`}
          title="Settings"
        >
          <CogIcon className="w-6 h-6" />
          <span className={`text-base ${!isOpen && "hidden"}`}>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
