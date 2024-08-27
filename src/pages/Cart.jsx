import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../components/CartContext";
import { FaPlus, FaMinus, FaTrashAlt, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeCourseFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { totalAmount } });
  };

  const handleSelectAddress = () => {
    navigate("/select-address");
  };

  return (
    <div className="container mx-auto px-4 py-4 flex">
      <div className="w-full lg:w-3/4">
        <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
            <p className="text-gray-700 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row items-center justify-between p-4 space-y-4 lg:space-y-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.product_name}
                      </h3>
                      <p className="text-gray-200">Price: ₹{item.unit_price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg text-white">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeCourseFromCart(item.id)}
                      className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex flex-col lg:flex-row items-center justify-between bg-gray-100 space-y-4 lg:space-y-0">
              <div className="text-xl font-semibold text-gray-800">
                Total: ₹{totalAmount}
              </div>
              {/* <div className="flex space-x-4">
                <button
                  className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    cartItems.length === 0 || totalAmount === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleProceedToPayment}
                  disabled={cartItems.length === 0 || totalAmount === 0}
                >
                  Proceed to Payment
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
                  onClick={handleSelectAddress}
                >
                  Select Address
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-1/4 pl-4">
        <div className="bg-gray-200 shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="border-b border-gray-400 mb-4"></div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Total Items:</span>
            <span className="text-gray-900">{cartItems.length}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Total Quantity:</span>
            <span className="text-gray-900">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-gray-900">₹{totalAmount}</span>
          </div>
          <div className="border-t border-gray-400 mt-4 pt-4">
            <button
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                cartItems.length === 0 || totalAmount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleProceedToPayment}
              disabled={cartItems.length === 0 || totalAmount === 0}
            >
              Proceed to Payment
            </button>
            <button
              className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
              onClick={handleSelectAddress}
            >
              Select Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
