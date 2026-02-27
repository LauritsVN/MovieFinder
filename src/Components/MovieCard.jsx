import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const MovieCard = ({ movie, onSwipe, genreNames }) => {
  const [hasWatched, setHasWatched] = useState(false);

  return (
    <TinderCard 
      onSwipe={(dir) => onSwipe(dir, movie, hasWatched)}
      preventSwipe={['up', 'down']}
      className="swipe-card"
    >
      <div className="card" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster_Path})` }}>
        <div className="card-info">
          <h3>{movie.title || movie.original_title}</h3>
          
          <div className="checkbox-container" onClick={(e) => e.stopPropagation()}>
            <input 
              type="checkbox" 
              id={`seen-${movie.id}`}
              checked={hasWatched} 
              onChange={(e) => setHasWatched(e.target.checked)} 
            />
            <label htmlFor={`seen-${movie.id}`}>Har set den</label>
          </div>

          <button className="info-btn" onClick={(e) => {
             e.stopPropagation();
             alert(movie.overview); 
          }}>Info</button>

          <div className="genres">
            {movie.genre_ids?.map(id => (
              <span key={id} className="genre-badge">{genreNames[id]}</span>
            ))}
          </div>
        </div>
      </div>
    </TinderCard>
  );
};

export default MovieCard;