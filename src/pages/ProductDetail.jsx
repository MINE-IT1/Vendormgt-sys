import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CartContext from "../components/CartContext";
import {
  FaShoppingCart,
  FaShoppingBag,
  FaStar,
  FaEdit,
  FaImage,
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaTimesCircle,
  FaCamera,
} from "react-icons/fa";

const ProductDetail = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateProductRating } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 10;

  // Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/product/${product_id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [product_id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateProductRating(product_id, newRating);
  };

  const handleReviewSubmit = () => {
    const newReview = {
      rating,
      text: reviewText,
      photos: reviewPhotos,
      date: new Date().toLocaleDateString(),
      author: "Unknown", // Replace with actual author if available
    };

    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
    setReviewText("");
    setReviewPhotos([]);
    setRating(0);
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedPhotos = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setReviewPhotos(uploadedPhotos);
  };

  const handleCameraClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current.click();
  };

  const handleCancelReview = () => {
    // Reset and hide the review form
    setShowReviewForm(false);
    setReviewText("");
    setReviewPhotos([]);
    setRating(0);
  };

  const getDisplayedReviews = () => {
    if (showAllReviews) {
      return reviews.slice(
        currentPage * reviewsPerPage,
        (currentPage + 1) * reviewsPerPage
      );
    }
    return reviews.slice(0, 3);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * reviewsPerPage < reviews.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getRatingPercentage = (ratingValue) => {
    const totalReviews = reviews.length;
    const ratingCount = reviews.filter(
      (review) => review.rating === ratingValue
    ).length;
    return (ratingCount / totalReviews) * 100;
  };

  const handleBuyClick = () => {
    if (product) {
      navigate("/payment", { state: { totalAmount: product.unit_price } });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl border border-gray-300">
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Product Images */}
          <div className="flex flex-col items-center lg:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">
              {product.product_name}
            </h1>
            <div className="flex">
              {/* Thumbnails */}
              <div className="flex flex-col items-center mr-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover border rounded-lg cursor-pointer mb-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div >
              {/* Selected Image */}
              <div>
                <img
                  src={product.images[selectedImage]}
                  alt={`Product Image ${selectedImage + 1}`}
                  className="w-64 h-64 object-cover mb-4 border rounded-lg hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
          {/* Product Details */}
          <div className="lg:w-1/2 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-500 text-2xl font-bold">
                  ₹{product.unit_price}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handleBuyClick}
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                >
                  <FaShoppingBag  className="h-5 w-5" />
                  <span>Buy</span>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span>Add To Cart</span>
                </button>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Description:</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Reviews and Ratings
                </h2>
                <div>
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <FaStar className="text-yellow-500 h-5 w-5" />
                      <span className="text-gray-700 ml-2">
                        {5 - index} stars
                      </span>
                      <div className="ml-2 w-full bg-gray-200 rounded">
                        <div
                          className="bg-yellow-500 h-2 rounded"
                          style={{
                            width: `${getRatingPercentage(5 - index)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-700 ml-2">
                        {getRatingPercentage(5 - index).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 mt-2 flex items-center space-x-2"
                  >
                    {showReviewForm ? (
                      <>
                        <FaTimesCircle className="h-5 w-5" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <FaEdit className="h-5 w-5" />
                        <span>Write a Review</span>
                      </>
                    )}
                  </button>
                  {showReviewForm && (
                    <div className="mt-4">
                      <div className="flex items-center mb-4">
                        <span className="mr-2">Rate the product:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer text-2xl ${
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg mb-2"
                        rows="4"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <div className="mb-2">
                        <label className="block mb-2 text-gray-700">
                          Add your photos:
                        </label>
                        <button
                          onClick={handleCameraClick}
                          className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
                        >
                          <FaCamera className="h-6 w-6" />
                          <span>Upload Photos</span>
                        </button>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          ref={fileInputRef}
                          style={{ display: "none" }} // Hide the input
                        />
                        <div className="flex mt-2">
                          {reviewPhotos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Review Photo ${index + 1}`}
                              className="w-16 h-16 object-cover border rounded-lg mr-2"
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleReviewSubmit}
                        className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 mt-2 flex items-center space-x-2"
                      >
                        <FaImage className="h-5 w-5" />
                        <span>Send Review</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="border border-gray-300 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Customer Reviews:
                </h2>
                {getDisplayedReviews().map((review, index) => (
                  <div key={index} className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 h-5 w-5" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-gray-300 h-5 w-5" />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.text}</p>
                    <div className="flex">
                      {review.photos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo}
                          alt={`Review Photo ${i + 1}`}
                          className="w-16 h-16 object-cover border rounded-lg mr-2"
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      By: {review.author}
                    </p>
                  </div>
                ))}
                {reviews.length > 3 && !showAllReviews && (
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 mt-4 flex items-center space-x-2"
                  >
                    <FaArrowDown className="h-5 w-5" />
                    <span>View All {reviews.length} Reviews</span>
                  </button>
                )}
                {showAllReviews && reviews.length > 10 && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePrevPage}
                      className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                      disabled={currentPage === 0}
                    >
                      <FaArrowLeft className="h-5 w-5" />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={handleNextPage}
                      className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-500 hover:bg-red-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                      disabled={
                        (currentPage + 1) * reviewsPerPage >= reviews.length
                      }
                    >
                      <FaArrowRight className="h-5 w-5" />
                      <span>Next</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
