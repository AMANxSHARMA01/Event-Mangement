import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";

const VendorItemsPage = () => {
  const { vendorId } = useParams();  // Get vendorId from URL
  const [vendor, setVendor] = useState(null);
  const [items, setItems] = useState([]);
  const { cart, addToCart } = useCart(); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handleAddToCart = (item) => {
    addToCart(item); // Add the vendor to the cart
    navigate('/cart'); // Navigate to the cart page
  };

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const vendorResponse = await fetch(`http://localhost:8080/api/vendors/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (!vendorResponse.ok) {
          throw new Error(vendorData.error || "Failed to fetch vendor details.");
        }
        setVendor(vendorData);

        const itemsResponse = await fetch(`http://localhost:8080/api/vendors/${vendorId}/items`);
        const itemsData = await itemsResponse.json();

        if (!itemsResponse.ok) {
          throw new Error(itemsData.error || "Failed to fetch vendor items.");
        }
        console.log(itemsData)
        setItems(itemsData);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      }
      setLoading(false);
    };

    fetchVendorData();
  }, [vendorId]);

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
      
         

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="text-xl">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col max-w-4xl mx-auto w-full">
        <Navbar />
          {vendor && (
            <div className="text-center my-6">
              <h2 className="text-2xl font-bold">{vendor.name}</h2>
              <p className="text-lg text-gray-600">Contact: {vendor.contact}</p>
            </div>
          )}

          <div className="text-xl font-bold text-center my-6">Products</div>

          {items.length === 0 ? (
            <div className="text-center text-lg text-gray-600">No items available for this vendor.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-green-600 text-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-bold mb-4">{item.name}</h3>
                  <p className="text-sm mb-4">Price: ₹{item.price}</p>
                  <p className="text-sm mb-4">Description: {item.description}</p>
                  <button onClick={() => handleAddToCart(item)} className="px-4 py-2 bg-white text-black border border-green-500 rounded-md hover:bg-green-100">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorItemsPage;
