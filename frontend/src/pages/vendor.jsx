import React from 'react'
import { useNavigate } from "react-router-dom";


function Vendor() {
    const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
};
    return (
        <div className="App">
          <header className="App-header">
            <div className="welcome-banner">
              <h1>Welcome {localStorage.getItem("vendorName")}</h1>
              
            </div>
            <div className="button-container">
              <button className="ui-button">Your Item</button>
              <button className="ui-button">Add New Item</button>
              <button className="ui-button">Transaction</button>
              <button className="ui-button" onClick={handleLogout}>LogOut</button>
            </div>
          </header>
        </div>
      );
}

export default Vendor
