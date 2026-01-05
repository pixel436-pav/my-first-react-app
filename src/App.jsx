import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

import Search from './components/Search.jsx'
import MovieCard from './components/MovieCard.jsx'

const API_BASE_URL = 'http://www.omdbapi.com'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '8548f7e4'


// const API_OPTIONS = {
//   method:'Get',
//   headers:{
//     accept:'application/json',
//     Authorization:`Bearer ${API_KEY}`
//   }
// }

const App = () => {
  // you should ony mutate the state using the setter function
  const [searchTerm,setSearchTerm] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [movieList,setMovieList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce prevent the searchTerm to prevent form making too much requests
  //by waiting for user to stop typing for 500ms

  useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies = async ( query ='')=>{

    setIsLoading(true);
    setErrorMessage('');

    try {
     const endpoint = `${API_BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint)

     if(!response.ok) {
      throw new Error('failed to fetch Movies')
    }
    const data = await response.json();

    console.log(data)

    if(data.Response === 'False'){
      setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovieList([]);
      return;
    }
    setMovieList(data.Search || 'Failed to fetch Movies')
    } catch (error) {
      console.error(`Error In fetching Movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally{
      setIsLoading(false);
    }
  }
  
  // Load initial movies on mount
  useEffect(() => {
    fetchMovies('marvel'); // Load some default movies on first load
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm])

  return (

   <main>
    <div className='pattern'>
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero Banner" />
          <h1>Find the <span className='text-gradient'>Movies</span> You Enjoy the Most!</h1>
          
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2 className='mt-[20px]' >All Movies</h2>
          {isLoading ? ( <p className='text-white'>Loading...</p> ) : errorMessage ? ( <p className="text-red-500">{errorMessage}</p> ) : ( <ul>
            {movieList.map(( movie )=>( <MovieCard key={movie.imdbID} movie={movie} />))}
          </ul> )}

          {errorMessage && <p className="text-red-500">{errorMessage}</p> }
        </section>

      </div>
    </div>
   </main>
  )
}

export default App

