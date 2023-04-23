import {FaFacebook, FaTwitter,FaInstagram, FaTiktok} from 'react-icons/fa';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className='flex flex-col-reverse justify-between items-center text-center p-5 gap-5 md:p-10 border-t-2 border-slate-500 md:flex-row'>
      <p className='mt-2 md:mt-0'>&copy; {year} :: All right reserved</p>
      <div className='flex items-center gap-5'>
        <a href='https://mobile.facebook.com/philip.oyelegbin' className='text-4xl' target='_blank'><FaFacebook/></a>
        <a href='https://' className='text-4xl' target='_blank'><FaInstagram/></a>
        <a href='https://mobile.twitter.com/OyelegbinPhilip' className='text-4xl' target='_blank'><FaTwitter/></a>
        <a href='https://' className='text-4xl' target='_blank'><FaTiktok/></a>
      </div>
    </footer>
  )
}

export default Footer