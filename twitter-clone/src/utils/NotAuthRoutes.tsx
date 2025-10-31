import { Outlet, Navigate } from "react-router-dom";

const NotAuthRoutes = () => {
  const userData = localStorage.getItem("user");

  return userData ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRoutes;
