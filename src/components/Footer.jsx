import {FaFacebook, FaTwitter,FaInstagram, FaTiktok} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-dark.png';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className='px-5 py-10 gap-5 md:px-20 bg-gray-700 md:flex-row text-slate-200'>
      <div className='flex flex-col justify-between mb-5 gap-3 md:flex-row'>
        <img src={logo} className='w-20 h-20' alt="logo" />
        <ul className='flex flex-wrap gap-5'>
          <li><Link to="/" className='hover:text-slate-400'>Home</Link></li>
          <li><Link to="about-us" className='hover:text-slate-400'>About Us</Link></li>
          <li><Link to="blogs" className='hover:text-slate-400'>Blogs</Link></li>
          <li><Link to="write" className='hover:text-slate-400'>Write</Link></li>
        </ul>
      </div>
      <div className='flex flex-col-reverse justify-between items-center text-center md:flex-row'>
        <p className='mt-2 md:mt-0'>&copy; {year} AuthorsLens :: All right reserved</p>
        <div className='flex items-center gap-5'>
          <Link to='/' className="text-2xl ease-linear duration-300 hover:text-slate-400"><FaFacebook/></Link>
          <Link to='/' className="text-2xl ease-linear duration-300 hover:text-slate-400"><FaInstagram/></Link>
          <Link to='/' className="text-2xl ease-linear duration-300 hover:text-slate-400"><FaTwitter/></Link>
          <Link to='/' className="text-2xl ease-linear duration-300 hover:text-slate-400"><FaTiktok/></Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer