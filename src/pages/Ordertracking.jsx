import React from "react";



function Ordertracking() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-100">
        <div className="container mx-auto py-5 h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-lg">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 mb-2">
                        Order ID{" "}
                        <span className="font-bold text-gray-900">
                          1222528743
                        </span>
                      </p>
                      <p className="text-gray-500 mb-0">
                        Placed On{" "}
                        <span className="font-bold text-gray-900">
                          12, March 2019
                        </span>
                      </p>
                    </div>
                    <div>
                      <h6 className="text-lg mb-0">
                        <a href="#" className="text-blue-600">
                          View Details
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex mb-4 pb-2">
                    <div className="flex-grow">
                      <h5 className="font-bold">Headphones Bose 35 II</h5>
                      <p className="text-gray-500">Qty: 1 item</p>
                      <h4 className="mb-3">
                        $299{" "}
                        <span className="text-sm text-gray-500">via (COD)</span>
                      </h4>
                      <p className="text-gray-500">
                        Tracking Status on:{" "}
                        <span className="text-gray-900">11:30pm, Today</span>
                      </p>
                    </div>
                    <div>
                      <img
                        className="object-cover h-24 w-24"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/6.webp"
                        alt="product"
                      />
                    </div>
                  </div>
                  <ul className="flex justify-between items-center text-gray-500">
                    <li className="relative step active flex-1 text-center">
                      <span className="block w-7 h-7 rounded-full bg-blue-600 text-white mx-auto mb-2 leading-7">
                        1
                      </span>
                      PLACED
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-blue-600"></span>
                    </li>
                    <li className="relative step active flex-1 text-center">
                      <span className="block w-7 h-7 rounded-full bg-blue-600 text-white mx-auto mb-2 leading-7">
                        2
                      </span>
                      SHIPPED
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-blue-600"></span>
                    </li>
                    <li className="relative step flex-1 text-center">
                      <span className="block w-7 h-7 rounded-full bg-gray-400 text-white mx-auto mb-2 leading-7">
                        3
                      </span>
                      DELIVERED
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-gray-400"></span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between">
                    <h5 className="font-normal">
                      <a href="#" className="text-blue-600">
                        Track
                      </a>
                    </h5>
                    <div className="border-l h-full mx-2"></div>
                    <h5 className="font-normal">
                      <a href="#" className="text-blue-600">
                        Cancel
                      </a>
                    </h5>
                    <div className="border-l h-full mx-2"></div>
                    <h5 className="font-normal">
                      <a href="#" className="text-blue-600">
                        Pre-pay
                      </a>
                    </h5>
                    <div className="border-l h-full mx-2"></div>
                    <h5 className="font-normal">
                      <a href="#" className="text-gray-500">
                        <i className="fas fa-ellipsis-v"></i>
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}

export default Ordertracking
