// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import UPIicon from "../../public/img/UPI.png"
// import {
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcPaypal,
//   FaMoneyBillWave,
  

// } from "react-icons/fa";
// // import { SiGooglepay, SiPaypal, SiPaytm } from "react-icons/si";
// import { jwtDecode } from "jwt-decode";

// const Payment = () => {
//   const { state } = useLocation();
//   const totalAmount = state?.totalAmount || 0;

//   const [paymentMethod, setPaymentMethod] = useState("credit-card");
//   const [orderId, setOrderId] = useState(1); // Replace with actual order ID
//   const [userId, setUserId] = useState(null);
//   const [cardNumber, setCardNumber] = useState("");
//   const [nameOnCard, setNameOnCard] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [confirmation, setConfirmation] = useState(null);
//   const [errormsg, setErrormsg] = useState("");

//   const jwtToken = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (jwtToken) {
//       const decoded = jwtDecode(jwtToken);
//       setUserId(decoded.sub.customer_id);
//     }
//   }, [jwtToken]);

//   const handlePayment = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/api/v1/payments/${orderId}`,
//         {
//           payment_method: paymentMethod,
//           order_id: orderId,
//           card_number: cardNumber,
//           name_on_card: nameOnCard,
//           expiry_date: expiryDate,
//           cvv: cvv,
//         }
//       );
//       setConfirmation(response.data.order_confirmation);
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCardNumberChange = (event) => {
//     event.target.value = event.target.value
//       .replace(/[^\dA-Z]/g, "")
//       .replace(/(.{4})/g, "$1 ")
//       .trim();
//     setCardNumber(event.target.value);
//   };

//   const handleExpiryChange = (event) => {
//     setExpiryDate(event.target.value);
//   };

//   const handleCvvChange = (event) => {
//     setCvv(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setNameOnCard(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!nameOnCard.trim()) {
//       setErrormsg("Name is required");
//     } else if (!cardNumber.trim()) {
//       setErrormsg("Please enter a valid card number");
//     } else if (cvv.trim().length !== 3) {
//       setErrormsg("Please enter a valid cvc number");
//     } else if (expiryDate.trim().length !== 5) {
//       setErrormsg("Please enter a valid expiry date in format MM/YY");
//     } else {
//       handlePayment();
//     }
//   };

//   const continueShopping = () => {
//     window.location.reload(true);
//   };

//   return (
//     <div className="container mx-auto p-6 font-sans">
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
//             <h2 className="mb-6 text-xl font-semibold">
//               Select payment method
//             </h2>
//             <div className="flex gap-4 items-center">
//               <select
//                 className="form-select block w-full mt-1 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               >
//                 <option value="credit-card">Credit Card</option>
//                 <option value="upi">UPI</option>
//                 <option value="paypal">PayPal</option>
//                 <option value="cod">Cash on Delivery</option>
//               </select>

//               <div className="flex gap-4">
//           {paymentMethod === "credit-card" && <FaCcVisa size={30} className="text-blue-700" />}
//           {paymentMethod === "credit-card" && <FaCcMastercard size={30} className="text-red-700" />}
//           {paymentMethod === "paypal" && <FaCcPaypal size={30} className="text-blue-500" />}
//           {paymentMethod === "cod" && <FaMoneyBillWave size={30} className="text-green-500" />}
//           {paymentMethod === "upi" && (
//           <>
//             <img src={UPIicon} alt="UPI Payment" className="h-8 mr-4" />
  
//           </>
//         )}
//         </div>
//             </div>
//           </div>

//           {paymentMethod === "credit-card" && (
//             <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
//               {" "}
//               <div className="App text-center">
//                 <div
//                   className="cc bg-gray-800 text-white p-6 rounded-lg shadow-lg relative bg-cover bg-center h-48 w-80 flex flex-col items-start justify-center rounded-xl bg-skyblue shadow-inner"
//                   style={{
//                     backgroundImage: "url(/img/ccard-removebg-preview.png)",
//                     backgroundSize: "cover",
//                   }}
//                 >
//                   <h1 className="text-2xl font-bold mb-2">
//                     Credit Card|Debit Card
//                   </h1>
//                   <div id="cardinfo" className="mb-2">
//                     <h3 className="text-lg mb-1">
//                       {cardNumber || "XXXX XXXX XXXX XXXX"}
//                     </h3>
//                     <h3 className="text-lg mb-1 uppercase">
//                       {nameOnCard || "Card Holder Name"}
//                     </h3>
//                     <div className="flex justify-between w-full">
//                       <p id="expiry">{expiryDate || "MM/YY"}</p>
//                       <p>{cvv || "CVC"}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="formwrapper mt-6">
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="relative">
//                       <label
//                         htmlFor="name"
//                         className="block text-sm font-medium text-gray-700 text-left"
//                       >
//                         Card Holder
//                       </label>
//                       <input
//                         id="name"
//                         onChange={handleNameChange}
//                         type="text"
//                         placeholder="Enter full name"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         style={{ border: "1px solid #d1d5db", padding: "10px" }}
//                       />
//                     </div>
//                     <div className="relative">
//                       <label
//                         htmlFor="card"
//                         className="block text-sm font-medium text-gray-700 text-left"
//                       >
//                         Credit Card Number
//                       </label>
//                       <input
//                         id="card"
//                         onChange={handleCardNumberChange}
//                         maxLength="19"
//                         type="text"
//                         placeholder="Enter card number"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                         style={{ border: "1px solid #d1d5db", padding: "10px" }}
//                       />
//                     </div>
//                     <div className="flex space-x-4">
//                       <div className="relative">
//                         <label
//                           htmlFor="exp"
//                           className="block text-sm font-medium text-gray-700 text-left"
//                         >
//                           Expiration Date
//                         </label>
//                         <input
//                           id="exp"
//                           onChange={handleExpiryChange}
//                           maxLength="5"
//                           type="text"
//                           placeholder="MM/YY"
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                           style={{
//                             border: "1px solid #d1d5db",
//                             padding: "10px",
//                           }}
//                         />
//                       </div>
//                       <div className="relative">
//                         <label
//                           htmlFor="cvc"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Security Code
//                           <span
//                             className="ml-2 text-blue-600 cursor-pointer"
//                             title="The 3-digit code on the back of your card."
//                           >
//                             What's this?
//                           </span>
//                         </label>
//                         <input
//                           id="cvc"
//                           onChange={handleCvvChange}
//                           maxLength="3"
//                           type="text"
//                           placeholder="CVC"
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                           style={{
//                             border: "1px solid #d1d5db",
//                             padding: "10px",
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                       {loading ? "Processing..." : "PURCHASE"}
//                     </button>
//                   </form>
//                   <h4 id="errormsg" className="mt-4 text-red-500">
//                     {errormsg}
//                   </h4>
//                 </div>

//                 {confirmation && (
//                   <div id="success" className="mt-6">
//                     <h2 className="text-2xl">
//                       THANK YOU FOR YOUR PURCHASE{" "}
//                       <span id="nametag">{nameOnCard}</span>
//                     </h2>
//                     <button
//                       onClick={continueShopping}
//                       className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                       CONTINUE SHOPPING
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Add forms for other payment methods similarly */}
//           {paymentMethod === "upi" && (
//             <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
//               <div className="formwrapper mt-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="relative">
//                     <label
//                       htmlFor="upi-id"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       UPI ID
//                     </label>
//                     <input
//                       id="upi-id"
//                       onChange={(e) => setCvv(e.target.value)}
//                       type="text"
//                       placeholder="Enter UPI ID"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       style={{ border: "1px solid #d1d5db", padding: "10px" }}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
//                   >
//                     {loading ? "Processing..." : "PURCHASE"}
//                   </button>
//                 </form>
//                 <h4 id="errormsg" className="mt-4 text-red-500">
//                   {errormsg}
//                 </h4>
//               </div>
//             </div>
//           )}

//           {paymentMethod === "paypal" && (
//             <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
//               {" "}
//               <div className="formwrapper mt-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="relative">
//                     <label
//                       htmlFor="paypal-email"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       PayPal Email
//                     </label>
//                     <input
//                       id="paypal-email"
//                       onChange={(e) => setCvv(e.target.value)}
//                       type="email"
//                       placeholder="Enter PayPal email"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       style={{ border: "1px solid #d1d5db", padding: "10px" }}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
//                   >
//                     {loading ? "Processing..." : "PURCHASE"}
//                   </button>
//                 </form>
//                 <h4 id="errormsg" className="mt-4 text-red-500">
//                   {errormsg}
//                 </h4>
//               </div>
//             </div>
//           )}

//           {paymentMethod === "cod" && (
//             <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
//               {" "}
//               <div className="formwrapper mt-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="relative">
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Delivery Address
//                     </label>
//                     <input
//                       id="address"
//                       onChange={(e) => setCvv(e.target.value)}
//                       type="text"
//                       placeholder="Enter delivery address"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                       style={{ border: "1px solid #d1d5db", padding: "10px" }}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
//                   >
//                     {loading ? "Processing..." : "PURCHASE"}
//                   </button>
//                 </form>
//                 <h4 id="errormsg" className="mt-4 text-red-500">
//                   {errormsg}
//                 </h4>
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">
//               {error}
//             </div>
//           )}
//         </div>

//         <div className="space-y-6 lg:col-span-1">
//         <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">            
//           <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="font-medium">Subtotal</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Discount</span>
//                 <span>-₹0.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Tax</span>
//                 <span>₹0.00</span>
//               </div>
//               <div className="flex justify-between text-lg font-semibold">
//                 <span>Total</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={handlePayment}
//             className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>

//       {confirmation && (
//         <div className="p-4 mt-6 bg-green-100 rounded-lg">
//           <p className="text-green-700">
//             Payment Successful! Confirmation:
//             <ul>
//               <li>Order ID: {confirmation.order_id}</li>
//               <li>User ID: {confirmation.user_id}</li>
//               <li>Product ID: {confirmation.product_id}</li>
//               <li>Total Price: ₹{confirmation.total_price}</li>
//               <li>Payment Method: {confirmation.payment_method}</li>
//               <li>Payment Status: {confirmation.payment_status}</li>
//               <li>Order Status: {confirmation.order_status}</li>
//               <li>Estimated Delivery: {confirmation.estimated_delivery}</li>
//             </ul>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import UPIicon from "../../public/img/UPI.png";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaMoneyBillWave,
} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

const Payment = () => {
  const { state } = useLocation();
  const totalAmount = state?.totalAmount || 0;

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderId, setOrderId] = useState(1); // Replace with actual order ID
  const [userId, setUserId] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const jwtToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      setUserId(decoded.sub.customer_id);
    }
  }, [jwtToken]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/v1/payments/${orderId}`,
        {
          payment_method: paymentMethod,
          order_id: orderId,
          card_number: cardNumber,
          name_on_card: nameOnCard,
          expiry_date: expiryDate,
          cvv: cvv,
        }
      );
      setConfirmation(response.data.order_confirmation);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (event) => {
    event.target.value = event.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(event.target.value);
  };

  const handleExpiryChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleNameChange = (event) => {
    setNameOnCard(event.target.value);
  };

  const validateFields = () => {
    const errors = {};
    if (!nameOnCard.trim()) {
      errors.nameOnCard = "Name is required";
    }
    if (!cardNumber.trim()) {
      errors.cardNumber = "Please enter a valid card number";
    }
    if (cvv.trim().length !== 3) {
      errors.cvv = "Please enter a valid CVC number";
    }
    if (expiryDate.trim().length !== 5) {
      errors.expiryDate = "Please enter a valid expiry date in format MM/YY";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      handlePayment();
    } else {
      setFieldErrors(errors);
    }
  };

  const continueShopping = () => {
    window.location.reload(true);
  };

  return (
    <div className="container mx-auto p-6 font-sans">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h2 className="mb-6 text-xl font-semibold">
              Select payment method
            </h2>
            <div className="flex gap-4 items-center">
              <select
                className="form-select block w-full mt-1 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit-card">Credit Card</option>
                <option value="upi">UPI</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>

              <div className="flex gap-4">
                {paymentMethod === "credit-card" && (
                  <FaCcVisa size={30} className="text-blue-700" />
                )}
                {paymentMethod === "credit-card" && (
                  <FaCcMastercard size={30} className="text-red-700" />
                )}
                {paymentMethod === "paypal" && (
                  <FaCcPaypal size={30} className="text-blue-500" />
                )}
                {paymentMethod === "cod" && (
                  <FaMoneyBillWave size={30} className="text-green-500" />
                )}
                {paymentMethod === "upi" && (
                  <img src={UPIicon} alt="UPI Payment" className="h-8 mr-4" />
                )}
              </div>
            </div>
          </div>

          {paymentMethod === "credit-card" && (
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300 flex justify-center items-center">
              <div className="w-full max-w-md">
                <div className="App text-center">
                  <div
                    className="cc bg-gray-800 text-white p-6 rounded-lg shadow-lg relative bg-cover bg-center h-48 flex flex-col items-start justify-center rounded-xl bg-skyblue shadow-inner"
                    style={{
                      backgroundImage: "url(/img/ccard-removebg-preview.png)",
                      backgroundSize: "cover",
                    }}
                  >
                    <h1 className="text-2xl font-bold mb-2">
                      Credit Card|Debit Card
                    </h1>
                    <div id="cardinfo" className="mb-2">
                      <h3 className="text-lg mb-1">
                        {cardNumber || "XXXX XXXX XXXX XXXX"}
                      </h3>
                      <h3 className="text-lg mb-1 uppercase">
                        {nameOnCard || "Card Holder Name"}
                      </h3>
                      <div className="flex justify-between w-full">
                        <p id="expiry">{expiryDate || "MM/YY"}</p>
                        <p>{cvv || "CVC"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="formwrapper mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 text-left"
                        >
                          Card Holder
                        </label>
                        <input
                          id="name"
                          onChange={handleNameChange}
                          type="text"
                          placeholder="Enter full name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px",
                          }}
                        />
                        {fieldErrors.nameOnCard && (
                          <p className="mt-2 text-sm text-red-600">
                            {fieldErrors.nameOnCard}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium text-gray-700 text-left"
                        >
                          Credit Card Number
                        </label>
                        <input
                          id="card"
                          onChange={handleCardNumberChange}
                          maxLength="19"
                          type="text"
                          placeholder="Enter card number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px",
                          }}
                        />
                        {fieldErrors.cardNumber && (
                          <p className="mt-2 text-sm text-red-600">
                            {fieldErrors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <div className="relative">
                          <label
                            htmlFor="exp"
                            className="block text-sm font-medium text-gray-700 text-left"
                          >
                            Expiration Date
                          </label>
                          <input
                            id="exp"
                            onChange={handleExpiryChange}
                            maxLength="5"
                            type="text"
                            placeholder="MM/YY"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            style={{
                              border: "1px solid #d1d5db",
                              padding: "10px",
                            }}
                          />
                          {fieldErrors.expiryDate && (
                            <p className="mt-2 text-sm text-red-600">
                              {fieldErrors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700 text-left"
                          >
                            CVC/CVV{" "}
                            <span
                              className="ml-1 text-gray-500 cursor-pointer"
                              title="The CVC is a 3-digit number on the back of your card."
                            >
                              (?)
                            </span>
                          </label>
                          <input
                            id="cvc"
                            onChange={handleCvvChange}
                            maxLength="3"
                            type="text"
                            placeholder="CVC"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            style={{
                              border: "1px solid #d1d5db",
                              padding: "10px",
                            }}
                          />
                          {fieldErrors.cvv && (
                            <p className="mt-2 text-sm text-red-600">
                              {fieldErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </button>
                    </form>
                    {error && (
                      <div className="mt-4 text-red-600 font-semibold">
                        {error}
                      </div>
                    )}
                    {confirmation && (
                      <div className="mt-4 text-green-600 font-semibold">
                        {confirmation}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={continueShopping}
                      className="mt-4 w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4 flex justify-between">
            <span>Order ID:</span>
            <span>{orderId}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Total Amount:</span>
            <span>{totalAmount}</span>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-red-600 font-semibold">{error}</div>
          )}
          {confirmation && (
            <div className="mt-4 text-green-600 font-semibold">
              {confirmation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
