import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../components/CartContext";
import axios from 'axios';

// Transform data function
const transformData = (data) => {
  return data.map(item => {
    const images = item.images && item.images.length > 0 ? item.images : ['path/to/default/image.jpg'];
    return {
      id: item.product_id,
      name: item.product_name,
      price: parseFloat(item.unit_price),
      originalPrice: parseFloat(item.unit_price),
      discount: 0,
      images
    };
  });
};

const Products = () => {
  const { addToCart, getProductRating } = useContext(CartContext);
  const [searchCourse, setSearchCourse] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:5000/api/products');
        const transformedData = transformData(result.data);
        setCourses(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
      {/* <header className="bg-green-500 p-5 text-white text-center">
        <h1>Products</h1>
      </header> */}

      <main className="flex flex-col items-center p-6 space-y-6">
        <div className="w-full flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for products"
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="product-list w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.length === 0 ? (
            <p className="text-gray-700 text-xl">No matching Product found.</p>
          ) : (
            filteredCourses.map((product) => (
              <div
                key={product.id}
                className="product bg-white border rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]} // Use the first image from the list
                        alt={product.z}
                        className="w-full h-48 object-cover mx-auto rounded-lg"
                      />
                    ) : (
                      <img
                        src="path/to/default/image.jpg" // Default image path
                        alt={product.name}
                        className="w-full h-48 object-cover mx-auto rounded-lg"
                      />
                    )}
                  </div>
                </Link>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-2">Rs. {product.price}</p>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        star <= getProductRating(product.id)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-600 ml-2">
                    Ratings: {getProductRating(product.id)}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">more...</p>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
