import React from 'react'

const MovieCard = ({ movie : { Title, Poster, Year }}) => {
  return (
    <>
    <div className='movie-card'>
      <img src= { Poster ? Poster : `no-movie.png` } alt={ Title } />
      <h6 className="text-white">{Title}</h6>
      <h6 className="text-white">{Year}</h6>
    </div>


    </>
  )
}

export default MovieCard
