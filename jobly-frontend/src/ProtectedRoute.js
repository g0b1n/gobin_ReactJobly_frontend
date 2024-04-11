import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';
 
function ProtectedRoute({ children }) {
    const { isLoggedIn } = useUser();
    
    return isLoggedIn ? children : <Navigate to="/login" replace />
};

export default ProtectedRoute;
