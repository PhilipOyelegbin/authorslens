import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" flex justify-center items-center h-screen md:h-[70vh] text-slate-200 bg-slate-800 bg-[url('./assets/homepage_bg.jpg')] bg-cover bg-no-repeat bg-center bg-blend-overlay bg-fixed md:bg-bottom">
      <div className='px-5 text-center md:px-20 animate__animated animate__fadeIn animate__slow'>
        <h1 className='my-5 text-4xl'>UNLEASH YOUR INNER WRITER</h1>
        <h3 className='my-5 text-3xl'>Join our community of storytellers - where words come to life!</h3>
        <Link to="/register" className='btn text-[#C31192] bg-slate-200 hover:text-slate-200 hover:bg-[#C31192] w-max'>Get Started</Link>
      </div>
    </section>
  )
}

export default Hero