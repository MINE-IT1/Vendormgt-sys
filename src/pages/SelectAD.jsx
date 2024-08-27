import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const SelectAD = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Varun ",
      address:
        "Vishnu's residency, ",
      city: "VISAKHAPATNAM",
      state: "ANDHRA PRADESH",
      zip: "530020",
      country: "India",
      phone: "7241636485",
    },
    {
      id: 2,
      name: "Yamini",
      address: "148, shivanagar colony Hyderguda",
      city: "HYDERABAD",
      state: "TELANGANA",
      zip: "500048",
      country: "India",
      phone: "6364964943",
    },
  ]);

  const navigate = useNavigate();

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  const handleDelivery = () => {
    if (selectedAddress) {
      // Ensure that the selected address data is properly passed
      navigate('/delivery', { state: { selectedAddress } });
    } else {
      alert("Please select an address to proceed.");
    }
  };

  return (
    <div className="p-4">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className={`border p-4 mb-4 rounded ${
            selectedAddress === addr.id ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <label className="flex items-center">
            <input
              type="radio"
              name="address"
              checked={selectedAddress === addr.id}
              onChange={() => handleAddressSelect(addr.id)}
              className="mr-4"
            />
            <div>
              <p className="font-bold">{addr.name}</p>
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state}, {addr.zip}
              </p>
              <p>{addr.country}</p>
              <p>Phone number: {addr.phone}</p>
            </div>
          </label>
        </div>
      ))}
      {selectedAddress ? (
        <Link
          to="/payment"
          state={{ selectedAddress }}
          className="w-full bg-yellow-500 text-white py-2 rounded mb-4 flex justify-center items-center"
        >
          Deliver to this address
        </Link>
      ) : (
        <button
          onClick={() => alert("Please select an address to proceed.")}
          className="w-full bg-yellow-500 text-white py-2 rounded mb-4"
        >
          Deliver to this address
        </button>
      )}
      <div className="space-y-4">
        <Link
          to="/checkout"
          className="w-full bg-yellow-500 text-white-700 py-2 rounded"
        >
          Add a New Address
        </Link>
      </div>
    </div>
  );
};

export default SelectAD;
