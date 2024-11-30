import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


function AddUser() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [membership, setMembership] = useState();
  const [pincode, setPincode] = useState();
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
    if (isNaN(number) || isNaN(pincode)) {
      setError("Number and Pincode must be valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          number: parseInt(number),
          pincode: parseInt(pincode),
          membership_duration:membership,
          city,
          address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add user.");
      } else {
        alert("User added successfully!");
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
            Add User
          </div>
          <form onSubmit={handleSubmit} className="form">
        {error && <div className="error-message">{error}</div>} {/* Error message display */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
              <input
            type="text"
            placeholder="Name"
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
                id="membership_duration"
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address Line 1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
             />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="number">Phone Number</label>
              <input
            type="text"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="pincode">Pincode</label>
              <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
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

export default AddUser

