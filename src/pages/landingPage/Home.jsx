import { useEffect } from 'react';
import Hero from './Hero';
import LatestBlogs from './LatestBlogs';
import Subscribe from './Subscribe';

const Home = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Home"
  }, [])

  return (
    <>
      <Hero/>
      <LatestBlogs/>
      <Subscribe/>
    </>
  )
}

export default Home