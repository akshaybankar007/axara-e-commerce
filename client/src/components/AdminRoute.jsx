import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If they are logged in AND an admin, let them through. Otherwise, kick them to the curb.
  return userInfo && userInfo.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;