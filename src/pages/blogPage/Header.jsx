import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const {data} = useSelector(state => state.searchBlog)

  function handleSearch(e) {
    e.preventDefault()
    setSearchInput(e.target.value)
    const filteredSearch = data?.filter(searchedItem => searchedItem.category == searchInput)
    setSearchResult(filteredSearch)
    openModal()
  }

  return (
    <header className="text-center py-5">
      <h2>Our Blogs</h2>
      <div className="flex justify-between items-start gap-5 p-5 md:px-20">
        <div className="w-1/2 md:w-2/6 relative">
          <button className='flex justify-between items-center w-full border-b-2 p-1' onClick={() => setToggleFilter(prev => !prev)}>Filter <FaChevronDown/></button>

          <ul className={`${!toggleFilter ? "hidden" : "block"} w-full bg-slate-300 absolute top-8 p-3 transition-all ease-in-out duration-300`}>
            <li className='hover:bg-[#13274f] hover:text-slate-300'>All</li>
            <li className='hover:bg-[#13274f] hover:text-slate-300'>Technology</li>
            <li className='hover:bg-[#13274f] hover:text-slate-300'>Lifestyle</li>
            <li className='hover:bg-[#13274f] hover:text-slate-300'>Relationship</li>
          </ul>
        </div>

        <input type="search" name="searchInput" id="searchInput" placeholder="Search for blog" className="w-1/2 py-1" value={searchInput} onChange={handleSearch}/>
      </div>
    </header>
  )
}

export default Header