import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa'
import logo from '../assets/logo-light.png'

const Nav = () => {
  const [show, setShow] = useState(false);
  const [controlHeader, setControlHeader] = useState(true)

  const menuContent = [
    {id: 1, label: 'Home', link: '/'},
    {id: 2, label: 'About Us', link: 'about-us'},
    {id: 3, label: 'Blogs', link: 'blogs'},
    {id: 4, label: 'Write', link: 'write'},
  ];

  show ? document.getElementById("root").classList.add("fixed") : document.getElementById("root").classList.remove("fixed");

  function handleMenuContent() {
    setShow(!show)
  };

  function handleScroll() {
    if(window.scrollY > 50) {
      setControlHeader(false)
    } else {
      setControlHeader(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <header className={`flex justify-between items-center shadow-sm shadow-slate-500 w-screen md:w-full text-[#13274f] p-5 md:px-20 md:py-5 z-30 ease-in duration-300 bg-slate-200 ${!controlHeader && "-md:translate-y-48"}`}>
      <NavLink to="/"><img src={logo} className='w-10' alt="logo" /></NavLink>

      <button className="text-4xl cursor-pointer md:hidden block z-20" onClick={handleMenuContent}>
        <FaBars className={`md:hidden h-6 w-6 ${show ? 'hidden' : 'block'}`} />
        <FaTimes className={`h-6 w-6 ${show ? 'block' : 'hidden'}`} />
      </button>

      <nav className={`fixed bg-slate-200 w-full pl-5 py-4 top-16 transition-all ease-in-out duration-300 md:static md:w-auto md-pl-0 md:py-0 z-20 ${show ? 'right-0' : '-right-full'}`}>
        <ul className="gap-5 md:flex md:items-center">
          {menuContent && menuContent?.map((contents) => (
            <li className='text-2xl mb-3 md:mb-0' key={contents.id}><NavLink className={({isActive})=> isActive ? 'opacity-50' : undefined} to={contents.link} onClick={handleMenuContent}>{contents.label}</NavLink></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav