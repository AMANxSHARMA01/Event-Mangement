import React from "react";
import Login from "../components/Login";


function AdminLogin() {
  return (
    <Login
      heading="Admin Login"
      apiEndpoint="http://localhost:8080/api/admin/login"
      redirectPath="/admin"
      role="admin"
    />
  );
}

export default AdminLogin;
