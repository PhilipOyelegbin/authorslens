import { useEffect } from 'react';
import Hero from './Hero';
import LatestBlogs from './LatestBlogs';
import LatestNews from './LatestNews';
import OtherNews from './OtherNews';

const Home = () => {
  useEffect(() => {
    document.title = "AuthorsLens: Home"
  }, [])

  return (
    <>
      <Hero/>
      <LatestBlogs/>
      <div className='flex flex-col lg:flex-row gap-5 px-5 my-10 md:px-20'>
        <LatestNews/>
        <OtherNews/>
      </div>
    </>
  )
}

export default Home