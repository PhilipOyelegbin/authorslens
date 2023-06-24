import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const email = sessionStorage.getItem('email');
  console.log(email);

  return email ? <Outlet/> : <Navigate to='/auth'/>;
}

export default ProtectedRoutes;