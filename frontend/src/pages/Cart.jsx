import React from 'react';
import { useCart } from '../context/CartContext'; // Import the context hook

const Cart = () => {
  const { cartItems, totalPrice, removeItem, updateQuantity, deleteAllItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-6">
    {['Home', 'View Product', 'Request Item', 'Product Status', 'LogOut'].map(
      (buttonText, index) => (
        <button
          key={index}
          className="px-4 py-2 border border-gray-600 rounded text-gray-700 hover:bg-gray-700 hover:text-white transition"
        >
          {buttonText}
        </button>
      )
    )}
  </div>

  {/* Shopping Cart Title */}
  <div className="text-center mb-6">
    <h1 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
      Shopping Cart
    </h1>
  </div>

  {/* Cart Table */}
  <div className="grid grid-cols-6 gap-4 items-center text-center font-medium text-gray-700">
    {/* Headers */}
    <div className="py-2 border-b border-gray-300">Image</div>
    <div className="py-2 border-b border-gray-300">Name</div>
    <div className="py-2 border-b border-gray-300">Price</div>
    <div className="py-2 border-b border-gray-300">Quantity</div>
    <div className="py-2 border-b border-gray-300">Total Price</div>
    <div className="py-2 border-b border-gray-300">Action</div>

    {/* Cart Items */}
    {cartItems.map(item => (
      <div
        key={item.id}
        className="grid grid-cols-6 gap-4 items-center text-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >

        {/* Name */}
        <div className="text-sm font-medium">{item.name}</div>

        {/* Price */}
        <div className="text-sm">{item.price} /-</div>

        {/* Quantity Selector */}
        <div>
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            {[1, 2, 3, 4, 5].map(option => (
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
            className="w-full px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Grand Total Section */}
  <div className="flex justify-between items-center bg-gray-100 text-gray-700 py-4 px-6 mt-6 rounded">
    <span className="font-medium">Grand Total</span>
    <span className="font-medium">{totalPrice} /-</span>
    <button
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      onClick={deleteAllItems}
    >
      Delete All
    </button>
  </div>

  {/* Proceed to Checkout */}
  <div className="mt-6 flex justify-center">
    <button className="px-6 py-3 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 flex items-center transition">
      Proceed to Checkout
      <span className="ml-2">➡️</span>
    </button>
  </div>
</div>

  );
};

export default Cart;
