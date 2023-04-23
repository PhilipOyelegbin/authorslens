import {FaFacebook, FaTwitter,FaInstagram, FaTiktok} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className='flex flex-col-reverse justify-between items-center text-center p-5 gap-5 md:p-10 border-t-2 border-[#13274f] md:flex-row'>
      <p className='mt-2 md:mt-0'>&copy; {year} Cumandra :: All right reserved</p>
      <div className='flex items-center gap-5'>
        <Link to='/' className="text-2xl ease-linear duration-300 hover:text-[#69094e]"><FaFacebook/></Link>
        <Link to='/' className="text-2xl ease-linear duration-300 hover:text-[#69094e]"><FaInstagram/></Link>
        <Link to='/' className="text-2xl ease-linear duration-300 hover:text-[#69094e]"><FaTwitter/></Link>
        <Link to='/' className="text-2xl ease-linear duration-300 hover:text-[#69094e]"><FaTiktok/></Link>
      </div>
    </footer>
  )
}

export default Footer