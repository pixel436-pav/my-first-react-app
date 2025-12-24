import React, { useState } from 'react'
import Search from './components/Search.jsx'

const App = () => {
  const [searchTerm,setSearchTerm] = useState('');
  // you should ony mutate the state using the setter function

  return (

   <main>
    <div className='pattern'>
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero Banner" />
          <h1>Find the <span className='text-gradient'>Movies</span> You Enjoy the Most!</h1>
          
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className='text-white'>{searchTerm}</h1>
      </div>
    </div>
   </main>
  )
}

export default App

