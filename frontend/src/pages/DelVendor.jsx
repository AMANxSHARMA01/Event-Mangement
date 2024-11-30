import React from 'react';
import DelEntity from '../components/DeleteEntity';
 // Import the reusable component

function DelVendor() {
  const navigateHome = () => {
    // Navigate to the home page
  };

  return (
    <DelEntity
      entityType="vendor"
      apiEndpoint="http://localhost:8080/api/vendors"
      entityLabel="Vendor"
      navigateHome={navigateHome}
    />
  );
}

export default DelVendor;
