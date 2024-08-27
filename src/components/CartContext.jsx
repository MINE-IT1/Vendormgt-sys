// import React, { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartCourses, setCartCourses] = useState([]);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [productRatings, setProductRatings] = useState({});

//   const addCourseToCart = (product) => {
//     setCartCourses((prevCartCourses) => {
//       const existingCourse = prevCartCourses.find(
//         (item) => item.product.product_id === product.product_id
//       );
//       if (existingCourse) {
//         return prevCartCourses.map((item) =>
//           item.product.product_id === product.product_id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCartCourses, { product, quantity: 1 }];
//       }
//     });
//     setCartItemCount((prevCount) => prevCount + 1);
//   };

//   const removeCourseFromCart = (productId) => {
//     setCartCourses((prevCartCourses) => {
//       const existingCourse = prevCartCourses.find(
//         (item) => item.product.product_id === productId
//       );
//       if (existingCourse) {
//         const newCart = prevCartCourses.filter(
//           (item) => item.product.product_id !== productId
//         );
//         setCartItemCount((prevCount) => prevCount - existingCourse.quantity);
//         return newCart;
//       }
//       return prevCartCourses;
//     });
//   };

//   const increaseQuantity = (productId) => {
//     setCartCourses((prevCartCourses) =>
//       prevCartCourses.map((item) =>
//         item.product.product_id === productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//     setCartItemCount((prevCount) => prevCount + 1);
//   };

//   const decreaseQuantity = (productId) => {
//     setCartCourses((prevCartCourses) => {
//       return prevCartCourses
//         .map((item) =>
//           item.product.product_id === productId
//             ? {
//                 ...item,
//                 quantity: item.quantity > 1 ? item.quantity - 1 : 0,
//               }
//             : item
//         )
//         .filter((item) => item.quantity > 0);
//     });
//     setCartItemCount((prevCount) => prevCount - 1);
//   };

//   const updateProductRating = (productId, rating) => {
//     setProductRatings((prevRatings) => ({
//       ...prevRatings,
//       [productId]: rating,
//     }));

//     // fetch(`/api/products/${productId}/rating`, {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({ rating }),
//     // }).catch((error) => console.error("Error updating rating:", error));
//   };

//   const getProductRating = (productId) => {
//     return productRatings[productId] || 0; // Default to 0 if rating is not set
//   };

//   const contextValues = {
//     cartCourses,
//     setCartCourses,
//     addCourseToCart,
//     removeCourseFromCart,
//     cartItemCount,
//     increaseQuantity,
//     decreaseQuantity,
//     updateProductRating,
//     getProductRating,
//   };

//   return (
//     <CartContext.Provider value={contextValues}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export default CartContext;

import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeCourseFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const getTotalItemCount = () => {
    const uniqueItems = new Set(cartItems.map(item => item.id));
    return uniqueItems.size;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
  };

  const getProductRating = (productId) => {
    // Implement your logic to get the product rating
    return 4; // Example static rating
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeCourseFromCart,
        getTotalItemCount,
        getTotalPrice,
        getProductRating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
