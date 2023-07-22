import { useEffect } from 'react';
import Hero from './Hero';
import LatestBlogs from './LatestBlogs';

const Home = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Home"
  }, [])

  return (
    <>
      <Hero/>
      <LatestBlogs/>
    </>
  )
}

export default Home