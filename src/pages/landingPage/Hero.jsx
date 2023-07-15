import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-screen md:h-[70vh] text-slate-200 bg-[url('./assets/homepage_bg.jpg')] bg-cover bg-no-repeat bg-center bg-fixed md:bg-bottom">
      <div className='bg-gray-800 bg-opacity-60 w-full h-full flex items-center'>
        <div className='px-5 md:px-20 lg:w-3/5 animate__animated animate__fadeIn animate__slow'>
          <h2 className='my-5 lg:text-left'>UNLEASH YOUR INNER WRITER</h2>
          <h4 className='my-5 lg:text-left'>Join our community of storytellers - where words come to life!</h4>
          <Link to="/register" className='btn text-[#C31192] bg-slate-200 hover:text-slate-200 hover:bg-[#C31192]'>Get Started</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero