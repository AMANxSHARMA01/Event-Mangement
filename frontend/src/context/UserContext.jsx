import React, { createContext, useState, useContext } from "react";

// Create a Context
const UserContext = createContext();

// Create a Provider to wrap the app
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // User will be null by default

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the User Context
export function useUser() {
  return useContext(UserContext);
}
