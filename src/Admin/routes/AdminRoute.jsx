import { Navigate } from "react-router-dom";
import { useStore } from "../../CONTEXT/StoreContext";

const AdminRoute = ({ children }) => {
  const { user } = useStore();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
