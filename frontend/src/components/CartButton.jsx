import { useCart } from "../context/CartContext"; // Assuming you're using context for cart
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const { cartItems } = useCart(); // Get cart items from context
  const navigate = useNavigate(); // Hook for navigation
  
  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={() => navigate("/cart")} // Navigate to the cart page
      className="relative px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition flex justify-center items-center"
    >
      {/* View Cart Text */}
      <span>🛒 View Cart</span>

      {/* Display the number of items in the cart */}
      {totalItems > 0 && (
        <span className=" bg-red-600 mx-4 text-white text-xs rounded-full px-2 py-1">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
