import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { readBlog, updateBlog } from "../../store/blogSlice";

const Edit = () => {
  const {id} = useParams()
  const {loading, read, update} = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [writer, setWriter] = useState({
    author_id: sessionStorage.getItem("user"),
    category: read?.category,
    title: read?.title,
    content: read?.content
  });
  const [image, setImage] = useState(read?.cover_image)

  const [hasSubmitted, setHasSubmitted] = useState(false)

  // const navigate = useNavigate();

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
  function handleUpdate(e) {
    e.preventDefault();
    sessionStorage.setItem("blog_id", id)

    const formData = new FormData()
    formData.append("cover_image", image)
    formData.append("author_id", writer.author_id)
    formData.append("category", writer.category)
    formData.append("title", writer.title)
    formData.append("content", writer.content)

    dispatch(updateBlog(formData))
    setHasSubmitted(true)
  };

  useEffect(() => {
    document.title = 'AuthorsLens: Update a blog!';
    dispatch(readBlog(id))
    if(hasSubmitted) {
      setTimeout(() => {
        if(update.status === 200) {
          toast.success("Updated successfully")
          setWriter({author_id: sessionStorage.getItem("user"), category: "others", title: "", content: ""})
          setImage("")
          navigate("/")
        } else {
          toast.error("Unable to update, try again later!")
          setHasSubmitted(false)
        }
      }, 2000);
    }
  }, [update.status])

  return (
    <section className='flex flex-row justify-between items-center p-5'>
      <form onSubmit={handleUpdate} encType='multipart/form-data' autoComplete="off" className='p-5 w-full lg:p-10 lg:w-5/6 lg:mx-auto'>
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
        <button type="submit" className="btn text-[#C31192] bg-slate-300 hover:text-slate-300 hover:bg-[#C31192]">{loading ? "Loading" : "Update"}</button>
      </form>
    </section>
  )
}

export default Edit