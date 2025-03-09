import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'admin' | 'superadmin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const user = useAppSelector((state) => state.auth.user);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If role is specified and user role doesn't match, redirect to /stores
  if (role && user.role !== role) {
    return <Navigate to="/stores" />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default ProtectedRoute;