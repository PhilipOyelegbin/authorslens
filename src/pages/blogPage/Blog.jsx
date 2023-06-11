import { useEffect } from "react"
import BlogList from "./BlogList"
import Header from "./Header"

const Blog = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Our Blogs"
  }, [])

  return (
    <>
      <Header/>
      <BlogList/>
    </>
  )
}

export default Blog