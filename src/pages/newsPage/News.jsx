import { useEffect } from "react"
import NewsList from "./NewsList"

const News = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Curated News"
  }, [])

  return (
    <>
      <h2 className="text-center mt-4">All News</h2>
      <NewsList/>
    </>
  )
}

export default News