import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {

  // Props should never be changed by child components they are read only 

  return (
    <div className='search'>
     <div>
      <img src="search.svg" alt="search" />
      <input type="text" placeholder='Search through thousands of movies' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
     </div>
    </div>
  )
}

export default Search
