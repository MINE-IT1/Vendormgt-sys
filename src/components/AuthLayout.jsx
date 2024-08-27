// src/components/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }} // Make sure the path is correct
    >
      {children}
    </div>
  );
};

export default AuthLayout;
