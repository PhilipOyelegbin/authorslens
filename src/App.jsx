import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import ProtectedRoutes from './components/ProtectedRoutes';
import SharedLayout from './components/SharedLayout';

const Home = lazy(() => import('./pages/landingPage/Home'));
const Founders = lazy(() => import('./pages/aboutPage/Founders'));
const Login = lazy(() => import('./pages/bloggerPage/Login'));
const Register = lazy(() => import('./pages/bloggerPage/Register'));
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
        <Route path='founders' element={<Founders/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
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
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Suspense>
  )
}

export default App
