import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';


function MaintainEntity() {
  const { role } = useParams(); // Extract role from URL
  const navigate = useNavigate();

  const entityLabel = role === "user" ? "User" : "Vendor"; // Dynamically set label based on role

  // State for membership form
  const [email, setEmail] = useState("");
  const [membership_duration, setMembershipDuration] = useState(6); // Default to 6 months
  const [message, setMessage] = useState(null);

  // Handle Membership Update API Call
  const handleMembershipUpdate = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Email address is required." });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/${role}s/update_membership`, {
        method: "PATCH", // Use PATCH for updating existing resource
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          membership_duration, // Send as number: 6, 12, 24
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: `${entityLabel} membership updated successfully!` });
        setEmail(""); // Clear email field after success
        setMembershipDuration(6); // Reset to default
      } else {
        const error = await response.json();
        setMessage({ type: "error", text: error.message || "Failed to update membership." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    }
  };

  // Navigate to Add/Delete
  const handleAdd = () => navigate(`/admin/maintain${entityLabel}/add`);
  const handleDel = () => navigate(`/admin/maintain${entityLabel}/delete`);

  return (
    <div className="flex flex-col h-screen justify-between bg-slate-50 px-20">
  <div className="flex flex-col max-w-4xl mx-auto w-full">
    <Navbar />
    <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      {entityLabel} Membership Management
    </h2>
    <div className="flex flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-[40px] flex-1">
        <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Email Address</p>
        <input
          type="email"
          placeholder="Enter email"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7397] p-[15px] text-base font-normal leading-normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
    </div>
    <div className="flex flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-[40px] flex-1">
        <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Membership Duration (Months)</p>
        <select
          className="w-full rounded-xl border border-[#d0dbe7] bg-slate-50 h-14 text-[#0e141b] focus:outline-none focus:ring-0 focus:border-[#d0dbe7] px-4 py-2 text-base font-normal leading-normal"
          value={membership_duration}
          onChange={(e) => setMembershipDuration(parseInt(e.target.value))}
        >
          <option value={6}>6 Months</option>
          <option value={12}>1 Year</option>
          <option value={24}>2 Years</option>
        </select>
      </label>
    </div>
    <div className="w-full flex justify-center mt-4">
      <button
        className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-6 bg-[#0e141b] text-white text-sm font-medium leading-normal"
        onClick={handleMembershipUpdate}
      >
        Confirm
      </button>
    </div>
    {message && (
      <div
        className={`mt-4 text-center ${
          message.type === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {message.text}
      </div>
    )}
    <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      {entityLabel} Management
    </h2>
    <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
      <p className="text-[#0e141b] text-base font-normal leading-normal flex-1 truncate">
        Add {entityLabel}
      </p>
      <div className="shrink-0">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-medium leading-normal w-fit"
          onClick={handleAdd}
        >
          <span className="truncate">Add</span>
        </button>
      </div>
    </div>
    <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
      <p className="text-[#0e141b] text-base font-normal leading-normal flex-1 truncate">
        Delete {entityLabel}
      </p>
      <div className="shrink-0">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-medium leading-normal w-fit"
          onClick={handleDel}
        >
          <span className="truncate">Delete</span>
        </button>
      </div>
    </div>
  </div>
  <div>
    <div className="h-5 bg-slate-50"></div>
  </div>
</div>

  );
}

export default MaintainEntity;
