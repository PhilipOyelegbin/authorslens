import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import write from "../../assets/writer.png";

const Write = () => {
    // handling state for writer
    const [writer, setWriter] = useState({
        coverimage: "", author: "", title: "", content: ""
    });

    const navigate = useNavigate();

    // a function for handling form submission
    function handlePublish() {
    };

    // a function for handling user logout action
    function handleLogout() {
        navigate('/login');
        sessionStorage.removeItem('username');
    }

    useEffect(() => {
        document.title = 'Cumandra - Write a blog!';
    }, [])

  return (
    <>
        {/* hero section */}
        <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/i-ve-missed-you-very-much_637285-12200.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 text-slate-300 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInUp animate__slow">
                    <h2>WE MISSED YOU!</h2>
                    <h4>We can't wait to read your next article</h4>
                </div>
            </div>
        </section>

        {/* form section for creating an article */}
        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={handlePublish} encType='multipart/form-data' autoComplete="off" className='p-5 w-full md:p-10 md:w-1/2'>
                <div className="form-control">
                    <label htmlFor="cover_image">Upload cover image</label>
                    <input id="cover_image" accept="image/*"/>
                </div>
                <div className="form-control">
                    <label htmlFor="author">Author</label>
                    <input id="author" placeholder="Enter author name"/>
                </div>
                <div className="form-control">
                    <label htmlFor="author">Title</label>
                    <input id="title" placeholder="Enter article title"/>
                </div>
                <div className="form-control">
                    <label htmlFor="author">Article</label>
                    <textarea id="content" cols="30" rows="10" placeholder="Write your article here..."></textarea>
                </div>
                <button type="submit" className="btn text-[#C31192] bg-slate-300 hover:text-slate-300 hover:bg-[#C31192]">Publish</button>
                <button className='btn text-slate-300 bg-slate-700 hover:text-slate-700 hover:bg-gray-300 ml-5' onClick={handleLogout}>Log Out</button>
            </form>

            <div className='hidden md:block md:w-1/2'>
                <img src={write} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Write