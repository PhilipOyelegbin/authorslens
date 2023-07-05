import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './utilities/ProtectedRoutes';
import SharedLayout from './utilities/SharedLayout';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/landingPage/Home'));
const Founders = lazy(() => import('./pages/aboutPage/Founders'));
const Login = lazy(() => import('./pages/bloggerPage/Login'));
const Register = lazy(() => import('./pages/bloggerPage/Register'));
const Auth = lazy(() => import('./pages/bloggerPage/Auth'));
const Write = lazy(() => import('./pages/bloggerPage/Write'));
const Error = lazy(() => import('./components/Error'));
const Blog = lazy(() => import('./pages/blogPage/Blog'));
const SingleBlog = lazy(() => import('./components/SingleBlog'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<SharedLayout/>} errorElement={<Error/>}>
        <Route index element={<Home/>}/>
        <Route path='blogs' element={<Blog/>}/>
        <Route path='about-us' element={<Founders/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='auth' element={<Auth/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='write' element={<Write/>}/>
        </Route>
        <Route path='blog/:id' element={<SingleBlog/>}/>
      </Route>
    )
  );

  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router}/>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Suspense>
  )
}

export default App
