import React from 'react';
import DelEntity from '../components/DeleteEntity';
 // Import the reusable component

function DelUser() {
  const navigateHome = () => {
    // Navigate to the home page
  };

  return (
    <DelEntity
      entityType="user"
      apiEndpoint="http://localhost:8080/api/users"
      entityLabel="User"
      navigateHome={navigateHome}
    />
  );
}

export default DelUser;
