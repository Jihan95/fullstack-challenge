// import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from '../store/index';

const requireAuth = (Component: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

        return isLoggedIn ? (<Component /> ) : <Navigate to="/" replace />; 
    }
}

export default requireAuth;