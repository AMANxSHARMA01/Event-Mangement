import React from 'react';
import { useCart } from '../context/CartContext'; // Import the context hook

const Cart = () => {
  const { cartItems, totalPrice, removeItem, updateQuantity, deleteAllItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 space-x-4">
        {['Home', 'View Product', 'Request Item', 'Product Status', 'LogOut'].map(
          (buttonText, index) => (
            <button
              key={index}
              className="px-4 py-2 border border-gray-600 rounded-lg text-gray-700 hover:bg-gray-700 hover:text-white transition duration-300"
            >
              {buttonText}
            </button>
          )
        )}
      </div>

      {/* Shopping Cart Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Shopping Cart
        </h1>
      </div>

      {/* Cart Table */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-6 gap-4 items-center text-center font-medium text-gray-700 border-b border-gray-300 pb-2">
          <div>Image</div>
          <div>Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total Price</div>
          <div>Action</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-6 gap-4 items-center text-center bg-white border border-gray-200 rounded-lg py-4 px-2 shadow-sm hover:shadow-md transition duration-300 mt-4"
          >
            {/* Image */}
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover rounded-lg mx-auto"
              />
            </div>

            {/* Name */}
            <div className="text-sm font-medium">{item.name}</div>

            {/* Price */}
            <div className="text-sm">{item.price} /-</div>

            {/* Quantity Selector */}
            <div>
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtotal */}
            <div className="text-sm">{item.price * item.quantity} /-</div>

            {/* Remove Button */}
            <div>
              <button
                className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total Section */}
      <div className="flex justify-between items-center bg-gray-100 text-gray-700 py-4 px-6 mt-8 rounded-lg shadow">
        <span className="font-medium">Grand Total</span>
        <span className="font-bold text-lg">{totalPrice} /-</span>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          onClick={deleteAllItems}
        >
          Delete All
        </button>
      </div>

      {/* Proceed to Checkout */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 flex items-center">
          Proceed to Checkout
          <span className="ml-2">➡️</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
