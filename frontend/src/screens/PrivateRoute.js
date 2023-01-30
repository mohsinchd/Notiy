import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const PrivateRoute = () => {
  const { isLoggedIn, checkingStatus } = useAuth();

  if (checkingStatus) {
    return <Spinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
