// src/components/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [logindata, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", logindata, { headers: { 'content-type': 'application/json' } });

      // Store the token in session storage
      sessionStorage.setItem('token', response.data.access_token);

      console.log(response.data);
      setMessage("Login successful!");
      setError(""); // Clear any previous error message
      setIsAuthenticated(true);

      // Redirect to dashboard on successful login
      navigate("/home");
    } catch (error) {
      console.error("There was an error!", error);
      setMessage(""); // Clear any previous success message

      // Check for 401 status and provide a specific message
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, logindata, setLoginData, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
