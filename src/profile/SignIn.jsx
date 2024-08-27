// src/profile/SignIn.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import AuthLayout from "../components/AuthLayout"; // Ensure this import is correct

const SignIn = () => {
  const { handleLogin, logindata, setLoginData } = useAuth();

  return (
    <AuthLayout>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen w-full flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl mb-6 text-center text-gray-700">Customer</h1>
          <h2 className="text-xl mb-6 text-center text-gray-700">Welcome back</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setLoginData({ ...logindata, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setLoginData({ ...logindata, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 font-semibold text-white rounded-lg shadow-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300"
            >
              Sign in to your account
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
                .
              </p>
            </div>
          </form>
          <div className="mt-6 space-y-4"></div>
        </div>
        <div className="hidden lg:block lg:ml-16">
          <img
            src="illustration.png"
            alt="Illustration"
            className="w-96 h-auto"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
