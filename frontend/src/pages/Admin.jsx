import React from 'react'
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';



function Admin() {
  const navigate = useNavigate();
  const { user } = useUser();
  
    const handleUser = () => {
      navigate("/admin/maintain/user");
    }

    const handleVendor = ()=>{
      navigate("/admin/maintain/vendor");
    }
        return (
          <div className="flex flex-col h-screen justify-between bg-slate-50 px-20"> 
            <Navbar/>
            <div className="flex flex-col items-center justify-center flex-grow space-y-4"> 
              <h1 className="text-2xl font-bold border border-black bg-white text-black px-8 py-3 rounded">Welcome {user ? user.name : "Admin"}</h1>
               <button className="border border-black bg-black text-white px-8 py-2 rounded w-64" onClick={handleUser}>
                Maintain User</button> 
               <button className="border border-black bg-black text-white px-8 py-2 rounded w-64" onClick={handleVendor}>
                Maintain Vendor</button> 
               </div>
                </div>
                  );
    
}

export default Admin
