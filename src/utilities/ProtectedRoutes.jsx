import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const authenticated = sessionStorage.getItem('user');

  return authenticated ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoutes;