import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector(store => store.user);

  // If there is no authUser in Redux, kick them to the login page
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the page they asked for
  return children;
};

export default ProtectedRoute;