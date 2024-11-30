import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

const AllVendorsPage = () => {
  const { category } = useParams();  // Get the category from the URL
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/vendors/category/${category}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch vendors.");
        }

        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
      setLoading(false);
    };

    fetchVendors();
  }, [category]); // Re-fetch data when category changes

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
      <div className="flex flex-col max-w-4xl mx-auto w-full">
        <Navbar />
          <div className="text-2xl font-bold text-center my-6 ">{category ? category.charAt(0).toUpperCase() + category.slice(1) : "Vendors"}</div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="text-xl">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vendors.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-600">
              No vendors available in this category.
            </div>
          ) : (
            vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-blue-600 text-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold mb-4">{vendor.name}</h3>
                <p className="text-sm mb-4">Contact number: {vendor.contact}</p>
                <Link to={`/vendor/${vendor._id}`}>
                  <button className="px-4 py-2 bg-white text-black border border-green-500 rounded-md hover:bg-green-100">
                    Shop Item
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default AllVendorsPage;
