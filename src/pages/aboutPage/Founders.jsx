import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import peter from '../../assets/peter.jpg';
import philip from '../../assets/philip.jpg';
import { Link } from "react-router-dom";

const Founders = () => {
  const initiators = [
    {avatar: philip, full_name: "Philip Oyelegbin", description: "Philip is a Frontend Engineer who currently works as a Customer Support Representative at WhoGoHost Limited based in Lagos, Nigeria. He graduated from Yaba College of Technology with a degree in Industrial Maintenance Engineering. He is passionate about creating digital solutions for SMEs.", linkedin: "//linkedin.com/in/philipoyelegbin", facebook: "//m.facebook.com/philip.oyelegbin", twitter: "//twitter.com/oyelegbinphilip" },
    {avatar: peter, full_name: "Peter Oyelegbin", description: "Peter is a skilled Backend Engineer with experience building functional and secure Apps/APIs, and currently works as an IT Support at Alert MFB in Lagos, Nigeria. He graduated from Yaba College of Technology with a degree in Industrial Maintenance Engineering.", linkedin: "//linkedin.com/in/peteroyelegbin", facebook: "//m.facebook.com/peter.oyelegbin", twitter: "//twitter.com/peteroyelegbin" }
  ]

  return (
    <>
      {/* hero section */}
      <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
        <div className='bg-black text-slate-300 bg-opacity-60 h-full flex flex-col justify-center items-center'>
          <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInUp animate__slow">
            <h2>MEET THE INITIATORS</h2>
            <h4>A passion-driven journey of creativity, innovation, and making a difference!</h4>
          </div>
        </div>
      </section>

      {/* initiators section */}
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5 px-5 my-10 md:px-20 lg:gap-10">
        {initiators?.map((initiator, index) => (
          <figure key={index} className="rounded-2xl shadow-lg shadow-slate-500">
            <img src={initiator.avatar} className="bg-gray-500 mx-auto w-full h-80 rounded-t-2xl lg:h-[500px]" alt={`photograph of ${initiator.full_name}`} />
            <figcaption className="p-5">
              <h3>{initiator.full_name}</h3>
              <p>{initiator.description}</p>
              <div className="flex items-center justify-end text-2xl gap-5 mt-3">
                <Link to={initiator.linkedin} className="ease-linear duration-300 hover:text-[#69094e]" target="_blank"><FaLinkedin/></Link>
                <Link to={initiator.facebook} className="ease-linear duration-300 hover:text-[#69094e]" target="_blank"><FaFacebook/></Link>
                <Link to={initiator.twitter} className="ease-linear duration-300 hover:text-[#69094e]" target="_blank"><FaTwitter/></Link>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}

export default Founders