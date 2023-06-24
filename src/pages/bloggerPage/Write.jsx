import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { postBlogs } from "../../store/blogSlice";
import write from "../../assets/writer.png";

const Write = () => {
    const [writer, setWriter] = useState({
        cover_image: "", author: "", title: "", content: ""
    });
    // const [writer, setWriter] = useState({
    //     cover_image: "", author: "", title: "", content: ""
    // });
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const {loading, error} = useSelector(state => state.blogs)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const editor = useRef(null)
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Start typing..."
        }),
        []
    )


    // a function for handling form input changes
    function handleChange(e) {
        const {name, value, files} = e.target
        setWriter({...writer, [name]: value || files[0]})
    };

    // a function for handling form submission
    function handlePublish(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("cover_image", writer.cover_image)
        formData.append("author", writer.author)
        formData.append("title", writer.title)
        formData.append("content", writer.content)
        dispatch(postBlogs(formData))
        setHasSubmitted(true)
    };

    // a function for handling user logout action
    function handleLogout() {
        navigate('/login');
        sessionStorage.clear();
    }

    useEffect(() => {
        document.title = 'AuthorsLens: Write a blog!';
        if(hasSubmitted) {
            setTimeout(() => {
                if(!error) {
                    toast.success("Published successfully")
                    setWriter({
                        cover_image: "", author: "", title: "", content: ""
                    })
                    navigate("/")
                } else {
                    toast.error("Unable to register, try again later!")
                    setHasSubmitted(false)
                }
            }, 2000);
        }
    }, [error])

  return (
    <>
        {/* hero section */}
        <section className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/i-ve-missed-you-very-much_637285-12200.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 text-slate-300 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInUp animate__slow">
                    <h2>WE MISSED YOU</h2>
                    <h4>We can't wait to read your next article.</h4>
                </div>
            </div>
        </section>

        {/* form section for creating an article */}
        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={handlePublish} encType='multipart/form-data' autoComplete="off" className='p-5 w-full md:p-10 md:w-1/2'>
                <div className="form-control">
                    <label htmlFor="cover_image">Upload cover image</label>
                    <input type="file" id="cover_image" name="cover_image" accept="image/*" value={writer.cover_image} onChange={handleChange} required/>
                    {/* {(formik.touched.first_name && formik.errors.first_name) && <p className="text-red-500">{formik.errors.first_name}</p>} */}
                </div>
                <div className="form-control">
                    <label htmlFor="author">Author</label>
                    <input id="author" name="author" value={writer.author} onChange={handleChange} placeholder="Enter author's name" required/>
                    {/* {(formik.touched.author && formik.errors.author) && <p className="text-red-500">{formik.errors.author}</p>} */}
                </div>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input id="title" placeholder="Enter article title" name="title" value={writer.title} onChange={handleChange} required/>
                    {/* {(formik.touched.title && formik.errors.title) && <p className="text-red-500">{formik.errors.title}</p>} */}
                </div>
                <div className="form-control">
                    <label htmlFor="article">Article</label>
                    <JoditEditor
                        ref={editor}
                        value={writer.content}
                        config={config}
                        tabIndex={1}
                        // onBlur={newContent => setWriter({...writer, content: newContent})}
                        onChange={newContent => setWriter({...writer, content: newContent})}
                    />
                    {/* {(formik.touched.content && formik.errors.content) && <p className="text-red-500">{formik.errors.content}</p>} */}
                </div>
                <button type="submit" className="btn text-[#C31192] bg-slate-300 hover:text-slate-300 hover:bg-[#C31192]">{loading ? "Loading" : "Publish"}</button>
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