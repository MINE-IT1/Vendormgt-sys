import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingCountry: "",
    shippingPhone: "",
    shippingEmail: "",
    sameAsShipping: false,
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
    billingPhone: "",
    billingEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/customers/${customerId}/details`, {
        address: formData.shippingAddress,
        phone_number: formData.shippingPhone,
      });

      if (response.status === 200) {
        alert("Customer details updated successfully");
        navigate("/success"); // Change the route to where you want to navigate after success
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
      alert("Failed to update customer details");
    }
  };

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad"];
  const states = ["Maharashtra", "Delhi", "Karnataka", "Telangana", "Gujarat"];
  const countries = ["India"];

  const customerId = 123; // Replace with actual customer ID

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkout Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Information:</h3>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="shippingName"
              value={formData.shippingName}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-2">
            City:
            <select
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            State:
            <select
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Postal Code:
            <input
              type="text"
              name="shippingPostalCode"
              value={formData.shippingPostalCode}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-2">
            Country:
            <select
              name="shippingCountry"
              value={formData.shippingCountry}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Phone Number:
            <input
              type="text"
              name="shippingPhone"
              value={formData.shippingPhone}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="shippingEmail"
              value={formData.shippingEmail}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Billing Information:</h3>
          <label className="block mb-2">
            <input
              type="checkbox"
              name="sameAsShipping"
              checked={formData.sameAsShipping}
              onChange={handleChange}
              className="mr-2"
            />
            Same as Shipping
          </label>
          {!formData.sameAsShipping && (
            <>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="billingName"
                  value={formData.billingName}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block mb-2">
                City:
                <select
                  name="billingCity"
                  value={formData.billingCity}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                State:
                <select
                  name="billingState"
                  value={formData.billingState}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Postal Code:
                <input
                  type="text"
                  name="billingPostalCode"
                  value={formData.billingPostalCode}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block mb-2">
                Country:
                <select
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Phone Number:
                <input
                  type="text"
                  name="billingPhone"
                  value={formData.billingPhone}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="billingEmail"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
