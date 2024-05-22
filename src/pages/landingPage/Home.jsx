import { useEffect } from 'react';
import Hero from './Hero';
import LatestBlogs from './LatestBlogs';
import LatestNews from './LatestNews';

const Home = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Home"
  }, [])

  return (
    <>
      <Hero/>
      <LatestBlogs/>
      <LatestNews/>
    </>
  )
}

export default Home