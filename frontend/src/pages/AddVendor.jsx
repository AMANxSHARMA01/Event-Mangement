import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


function AddVendor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState();
  const [membership, setMembership] = useState();
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleCancel = ()=>{
    navigate("/admin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Make sure number and pincode are numbers
    if (isNaN(contact)) {
      setError("Number and Pincode must be valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          contact: parseInt(contact),
          membership,
          category
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add user.");
      } else {
        alert("Vendor added successfully!");
        // Optionally, redirect or reset form
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while adding the user.");
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
      <div className="flex flex-col max-w-4xl mx-auto w-full">
        <Navbar />
          <div className="text-2xl font-bold text-center my-6 ">
            Add Vendor
          </div>
          <form onSubmit={handleSubmit} className="form">
        {error && <div className="error-message">{error}</div>} {/* Error message display */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
            type="text"
            placeholder=" Vendor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                required
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="membership_duration">Membership Duration</label>
              <select
                id="membership"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                defaultValue={6}
                required
                value={membership}
                onChange={(e) => setMembership(e.target.value)} 
              >
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
              <select
                id="category"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                required
               
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
              >
                <option value="">--Select--</option> 
                <option value={"Florist"}>Florist</option>
                <option value={"Lighting"}>Lighting</option>
                <option value={"Catering"}>Catering</option>
                <option value={"Decoration"}>Decoration</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="number">Phone Number</label>
              <input
            type="text"
            placeholder="Phone Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="reset"
                className="w-full px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-150 ease-in-out mr-2"
              onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-150 ease-in-out ml-2" disabled={loading}
              >
            {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
        </div>
    )
}

export default AddVendor;

