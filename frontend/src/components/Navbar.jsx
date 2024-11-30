import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
// Import the custom hook

function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  const handleLogoutClick = () => {
    setUser(null); // Clear user globally
    navigate("/"); // Redirect to home or login
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-4">
      <button
        onClick={() => navigate("/")}
        className="border border-black bg-black text-white px-6 py-2 rounded w-32"
      >
        Home
      </button>
      <button
        onClick={handleLogoutClick}
        className="border border-black bg-black text-white px-6 py-2 rounded w-32"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
