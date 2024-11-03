// src/Components/AuthRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const AuthRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    // Redirect to login if not authenticated
    return user ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
