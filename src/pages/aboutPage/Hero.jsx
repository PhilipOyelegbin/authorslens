
const Hero = () => {
  return (
    <section className="h-screen md:h-[70vh] bg-[url('https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
        <div className='bg-black text-slate-300 bg-opacity-60 h-full flex flex-col justify-center items-center'>
          <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInUp animate__slow">
            <h2>MEET THE INITIATORS</h2>
            <h4>A passion-driven journey of creativity, innovation, and making a difference!</h4>
          </div>
        </div>
    </section>
  )
}

export default Hero