import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { logoutUser } from "../store/authSlice";
import logo from "../assets/logo-light.png";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [controlHeader, setControlHeader] = useState(true);
  const { token } = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuContent = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "About Us", link: "about-us" },
    { id: 3, label: "Blogs", link: "blogs" },
    { id: 4, label: "Write", link: "write" },
  ];

  show
    ? document.getElementById("root").classList.add("fixed")
    : document.getElementById("root").classList.remove("fixed");

  function handleMenuContent() {
    setShow(!show);
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      setControlHeader(false);
    } else {
      setControlHeader(true);
    }
  }

  // a function for handling user logout action
  function handleLogout() {
    dispatch(logoutUser({ token: "" }));
    setLoggedOut(true);
  }

  useEffect(() => {
    if (loggedOut) {
      setTimeout(() => {
        if (token.status === 204) {
          sessionStorage.clear();
          navigate("/login");
        } else {
          toast.error("Unable to logout, try again!");
          setLoggedOut(false);
        }
      }, 2000);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token.status]);

  return (
    <header
      className={`flex justify-between items-center shadow-sm shadow-slate-400 w-screen md:w-full text-[#13274f] p-5 md:px-20 md:py-5 z-30 ease-in duration-300 bg-slate-200 ${
        !controlHeader && "-md:translate-y-48"
      }`}>
      <NavLink to='/'>
        <img src={logo} className='w-10' alt='logo' />
      </NavLink>

      <button
        className='text-4xl cursor-pointer md:hidden block z-20'
        onClick={handleMenuContent}>
        <FaBars className={`md:hidden h-6 w-6 ${show ? "hidden" : "block"}`} />
        <FaTimes className={`h-6 w-6 ${show ? "block" : "hidden"}`} />
      </button>

      <nav
        className={`fixed bg-slate-200 w-full pl-5 py-4 top-16 transition-all ease-in-out duration-300 md:static md:w-auto md-pl-0 md:py-0 z-20 ${
          show ? "right-0" : "-right-full"
        }`}>
        <ul className='gap-5 md:flex md:items-center'>
          {menuContent &&
            menuContent?.map((contents) => (
              <li className='text-xl mb-3 md:mb-0' key={contents.id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "opacity-50 ease-in-out duration-300"
                      : "hover:opacity-50"
                  }
                  to={contents.link}
                  onClick={handleMenuContent}>
                  {contents.label}
                </NavLink>
              </li>
            ))}
          {sessionStorage.getItem("user") && (
            <button
              className='btn text-slate-300 bg-slate-700 hover:text-slate-700 hover:bg-gray-300'
              onClick={handleLogout}>
              Log Out
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
