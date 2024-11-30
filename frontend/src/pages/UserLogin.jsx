import React from "react";
import Login from "../components/Login";


function UserLogin() {
  return (
    <Login
      heading="User Login"
      apiEndpoint="http://localhost:8080/api/users/login"
      redirectPath="/user"
      role="user"
    />
  );
}

export default UserLogin;
