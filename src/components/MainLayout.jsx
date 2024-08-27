// src/components/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children, toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
