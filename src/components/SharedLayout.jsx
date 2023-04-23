import { Outlet, ScrollRestoration } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';
import Nav from './Nav';

const SharedLayout = () => {
  return (
    <>
      <Nav/>
      <Outlet/>
      <Footer/>
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
    </>
  )
}

export default SharedLayout