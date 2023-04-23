
const Header = () => {
  return (
    <header className="text-center py-5">
        <h2>Our Blogs</h2>
        <div className="flex justify-between items-center gap-5 p-5 md:px-20">
            <select name="" id="" className="w-fit">
                <option value="">All</option>
                <option value="">Technology</option>
                <option value="">Lifestyle</option>
            </select>
            <input type="search" placeholder="Search for blog" className="lg:w-1/2"/>
        </div>
    </header>
  )
}

export default Header