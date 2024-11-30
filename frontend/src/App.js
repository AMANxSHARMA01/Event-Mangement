import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import VendorLogin from "./pages/VendorLogin";
import Admin from "./pages/Admin";
import User from './pages/User'
import Cart from "./pages/Cart";
import AddUser from "./pages/AddUser";
import DelUser from "./pages/DelUser";
import AddVendor from "./pages/AddVendor";
import DelVendor from "./pages/DelVendor";
import Vendor from "./pages/vendor";
import MaintainEntity from "./components/MaintainEntity";
import AllVendorsPage from "./components/AllVendorsPage";
import VendorItemsPage from "./components/VendorsItemPage";
import { CartProvider } from "./context/CartContext";



const App = () => (

<CartProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin/>} />
      <Route path="/user-login" element={<UserLogin/>} />
      <Route path="/vendor-login" element={<VendorLogin/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/admin/maintain/:role" element={<MaintainEntity />} />
      <Route path="/admin/maintainUser/add" element={<AddUser/>} />
      <Route path="/admin/maintainUser/delete" element={<DelUser/>} />
      <Route path="/admin/maintainVendor/add" element={<AddVendor/>} />
      <Route path="/admin/maintainVendor/delete" element={<DelVendor/>} />
      <Route path="/vendors/:category" element={<AllVendorsPage />} />
      <Route path="/user" element={<User/>} />
      <Route path="/vendor" element={<Vendor/>} />
      <Route path="/cart" element={<Cart/>} />

      <Route path="/vendor/:vendorId" element={<VendorItemsPage />} />
    </Routes>
  </Router>
  </CartProvider>

);

export default App;