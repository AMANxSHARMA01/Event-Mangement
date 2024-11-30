import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

const User = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();

  // Toggle the dropdown menu
  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <Navbar />
      <div className="text-2xl font-bold text-center my-6 ">
          WELCOME {user ? user.name : "User"}
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vendor Button with Dropdown */}
          <div className="relative">
            <button
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-lg flex justify-between items-center"
              onClick={handleDropdown}
            >
              Explore Vendors
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-300">
                <ul className="space-y-2 p-3">
                  <li>
                    <Link
                      to="/vendors/Catering"
                      className="block text-gray-800 hover:text-blue-600"
                    >
                      Catering
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/vendors/Florist"
                      className="block text-gray-800 hover:text-blue-600"
                    >
                      Florist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/vendors/Decoration"
                      className="block text-gray-800 hover:text-blue-600"
                    >
                      Decoration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/vendors/Lighting"
                      className="block text-gray-800 hover:text-blue-600"
                    >
                      Lighting
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>


          
          {/* Guest List Button */}
          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-lg flex justify-between items-center">
            Guest List 
          </button>

          {/* Cart Button */}
          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-lg flex justify-between items-center">
            <Link to="/cart">Cart</Link> 
          </button>


          {/* Order Status Button */}
          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-lg flex justify-between items-center">
            <Link to="/order-status">Order Status</Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default User;
