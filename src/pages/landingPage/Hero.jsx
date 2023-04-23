import { Link } from "react-router-dom";
import hero from '../../assets/hero.png'

const Hero = () => {
  return (
    <section className='home-hero'>
      <div className='w-5/6 px-3 md:px-20 md:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow'>
        <h2 className='text-center my-5 md:text-left md:w-96'>Lorem ipsum dolor sit amet.</h2>
        <h4 className='text-center my-5 md:text-left md:w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit, nostrum accusamus possimus illo quos earum?</h4>
        <div className='flex justify-center gap-5 my-5 md:justify-start'>
          <a href="#latest-blogs" className='btn'>Get Stared</a>
          <Link to="/register" className='btn text-[#C31192] bg-slate-200 hover:text-slate-200 hover:bg-[#C31192]'>Sign Up</Link>
        </div>
      </div>
      <div className='w-5/6 px-3 md:px-5 md:w-1/2 animate__animated animate__fadeInUp animate__slow'>
        <img src={hero} className="mx-auto" alt="hero-image" />
      </div>
    </section>
  )
}

export default Hero