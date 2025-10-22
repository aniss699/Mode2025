import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProfilRedirect() {
  // Redirect `/profil` to the new providers listing page
  return <Navigate to="/provider-profile" replace />;
}
