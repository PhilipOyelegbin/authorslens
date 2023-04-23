import { Link } from "react-router-dom";
import hero from '../../assets/hero.png'

const Hero = () => {
  return (
    <section className='home-hero'>
      <div className='w-5/6 px-3 md:px-20 lg:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow'>
        <h2 className='text-center my-5 lg:text-left lg:w-96'>UNLEASH YOUR INNER WRITER</h2>
        <h4 className='text-center my-5 lg:text-left lg:w-96'>Join our community of storytellers - where words come to life!</h4>
        <div className='flex justify-center gap-5 my-5 lg:justify-start'>
          <a href="#latest-blogs" className='btn'>Get Stared</a>
          <Link to="/register" className='btn text-[#C31192] bg-slate-200 hover:text-slate-200 hover:bg-[#C31192]'>Sign Up</Link>
        </div>
      </div>
      <div className='w-5/6 px-3 md:px-5 lg:w-1/2 animate__animated animate__fadeInUp animate__slow'>
        <img src={hero} className="mx-auto" alt="hero-image" />
      </div>
    </section>
  )
}

export default Hero