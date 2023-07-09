import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import peter from '../../assets/peter.jpg';
import philip from '../../assets/philip.jpg';
import { Link } from "react-router-dom";
import Hero from "./Hero";
import { useEffect } from "react";

const Founders = () => {
  const initiators = [
    {avatar: philip, full_name: "Philip Oyelegbin", description: "Philip is a Frontend Engineer who currently works as a Customer Support Representative at WhoGoHost Limited based in Lagos, Nigeria. He graduated from Yaba College of Technology with a degree in Industrial Maintenance Engineering. He is passionate about creating digital solutions for SMEs.", linkedin: "//linkedin.com/in/philipoyelegbin", facebook: "//m.facebook.com/philip.oyelegbin", twitter: "//twitter.com/oyelegbinphilip" },
    {avatar: peter, full_name: "Peter Oyelegbin", description: "Peter is a skilled Backend Engineer with experience building functional and secure Apps/APIs, and currently works as an IT Support at Alert Micro Finance Bank in Lagos, Nigeria. He graduated from Yaba College of Technology with a degree in Industrial Maintenance Engineering.", linkedin: "//linkedin.com/in/peteroyelegbin", facebook: "//m.facebook.com/peter.oyelegbin", twitter: "//twitter.com/peteroyelegbin" }
  ]

  useEffect(() => {
    document.title = "AuthorsLens: About Us"
  }, [])

  return (
    <>
      <Hero/>

      {/* about info */}
      <section className="px-5 py-10 md:px-20 bg-[#13274f] text-slate-200 flex flex-col justify-between gap-3 md:flex-row rounded-bl-[60px]">
        <div>
          <h5>WHO WE ARE</h5>
        </div>
        <div className="md:w-2/3">
          <h4 className="text-[#C31192] mb-3">Authors Lens was established with the purpose of providing aspiring writers a platform to hone their skills and gain confidence before showcasing their talents to a wider audience.</h4>
          <p>Our platform offers a supportive environment for writers to refine their writing abilities and embark on a journey of professional growth. With us, writers can freely experiment, receive constructive feedback, and cultivate their unique writing styles. We believe in nurturing talent and empowering writers to pursue their writing careers with proficiency and self-assurance. Through our inclusive community, we foster an atmosphere of creativity and learning, allowing writers to develop their craft while building connections with fellow wordsmiths. At Authors Lens, we are dedicated to empowering emerging writers and fostering a vibrant writing community.</p>
        </div>
      </section>

      {/* initiators section */}
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center gap-10 px-5 my-10 md:px-20">
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