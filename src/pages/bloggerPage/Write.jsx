import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { postBlog } from "../../store/blogSlice";

const Write = () => {
    const [writer, setWriter] = useState({
        author_id: sessionStorage.getItem("user"), category: "others", title: "", content: ""
    });
    const [image, setImage] = useState("")

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const {loading, create} = useSelector(state => state.blogs)

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
        const {name, value} = e.target
        setWriter({...writer, [name]: value})
    };

    // a function for handling form submission
    function handlePublish(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append("cover_image", image)
        formData.append("author_id", writer.author_id)
        formData.append("category", writer.category)
        formData.append("title", writer.title)
        formData.append("content", writer.content)

        dispatch(postBlog(formData))
        setHasSubmitted(true)
    };

    useEffect(() => {
        document.title = 'AuthorsLens: Write a blog!';
        if(hasSubmitted) {
            setTimeout(() => {
                if(create.status === 201) {
                    toast.success("Published successfully")
                    setWriter({author_id: sessionStorage.getItem("user"), category: "others", title: "", content: ""})
                    setImage("")
                    navigate("/")
                } else {
                    toast.error("Unable to publish, try again later!")
                    setHasSubmitted(false)
                }
            }, 1000);
        }
    }, [create.status])

  return (
    <>
        {/* hero section */}
        <section className="h-screen md:h-[70vh] bg-[url('https://img.freepik.com/free-photo/i-ve-missed-you-very-much_637285-12200.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 text-slate-300 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeIn animate__slow">
                    <h1>WE MISSED YOU</h1>
                    <h3>We can't wait to read your next article.</h3>
                </div>
            </div>
        </section>

        {/* form section for creating an article */}
        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={handlePublish} encType='multipart/form-data' autoComplete="off" className='p-5 w-full lg:p-10 lg:w-5/6 lg:mx-auto'>
                <h4 className="lg:text-center">Captivate your readers through the author's perspective.</h4>
                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-10">
                    <div className="form-control">
                        <label htmlFor="cover_image">Upload cover image</label>
                        <input type="file" id="cover_image" name="cover_image" accept="image/*" onChange={e => setImage(e.target.files[0])} required/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onChange={handleChange}>
                            <option value="">[Select a category]</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Relationship">Relationship</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input id="title" placeholder="Enter article title" name="title" value={writer.title} onChange={handleChange} required/>
                </div>
                <div className="form-control">
                    <label htmlFor="content">Article</label>
                    <JoditEditor
                        ref={editor}
                        value={writer.content}
                        config={config}
                        tabIndex={1}
                        // onBlur={newContent => setWriter({...writer, content: newContent})}
                        onChange={newContent => setWriter({...writer, content: newContent})}
                    />
                </div>
                <button type="submit" className="btn text-[#C31192] bg-slate-300 hover:text-slate-300 hover:bg-[#C31192]">{loading ? "Loading" : "Publish"}</button>
            </form>
        </section>
    </>
  )
}

export default Write