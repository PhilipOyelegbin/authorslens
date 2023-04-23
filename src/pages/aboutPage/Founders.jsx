import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"

const Founders = () => {
  const initiators = [
    {avatar: "", full_name: "Philip Oyelegbin", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, ut distinctio voluptatem deserunt laudantium soluta eaque suscipit porro at asperiores? Quo totam iusto cum ipsa possimus quae expedita obcaecati laboriosam quod reiciendis corrupti, facere quibusdam, dolorum ad provident a deserunt sapiente animi, exercitationem voluptatum sint architecto voluptatem. Veritatis, assumenda nisi?", linkedin: "", facebook: "", twitter: "" },
    {avatar: "", full_name: "Peter Oyelegbin", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, ut distinctio voluptatem deserunt laudantium soluta eaque suscipit porro at asperiores? Quo totam iusto cum ipsa possimus quae expedita obcaecati laboriosam quod reiciendis corrupti, facere quibusdam, dolorum ad provident a deserunt sapiente animi, exercitationem voluptatum sint architecto voluptatem. Veritatis, assumenda nisi?", linkedin: "", facebook: "", twitter: "" }
  ]
  return (
    <>
      {/* hero section */}
      <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
        <div className='bg-black text-slate-300 bg-opacity-60 h-full flex flex-col justify-center items-center'>
          <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInDown animate__slow">
            <h2>MEET THE INITIATORS</h2>
            <h4>Nice to see you again!</h4>
          </div>
        </div>
      </section>

      {/* initiators section */}
      <section className="flex flex-wrap justify-center gap-10 px-5 my-10 lg-gap-10">
        {initiators?.map((initiator, index) => (
          <figure key={index} className="w-full rounded-2xl shadow-lg shadow-slate-500 md:w-2/5">
            <img src={initiator.avatar} className="bg-gray-500 mx-auto w-full" alt={`photograph of ${initiator.full_name}`} />
            <figcaption className="p-5">
              <h3>{initiator.full_name}</h3>
              <p>{initiator.description}</p>
              <div className="flex items-center justify-end text-2xl gap-5 mt-3">
                <a href={initiator.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
                <a href={initiator.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
                <a href={initiator.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}

export default Founders