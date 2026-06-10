import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../CONTEXT/StoreContext";

const UserRoute = () => {
  const { user } = useStore();

  // If the logged in user is an admin, they are restricted to the admin panel
  if (user && user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  // Otherwise, it's a normal user or a guest, so they can access the storefront
  return <Outlet />;
};

export default UserRoute;
