import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../state/UserContext";

const PrivateRoutes = () => {
  const userContext = useUserContext();
  const { user } = userContext;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
