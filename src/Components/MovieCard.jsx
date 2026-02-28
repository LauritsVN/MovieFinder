import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const MovieCard = ({ movie, onSwipe, genreNames }) => {
  const [hasWatched, setHasWatched] = useState(false);
  const [showBack, setShowBack] = useState(false);

  // Funktion til at skifte mellem for- og bagside
  const toggleFlip = (e) => {
    e.stopPropagation();
    setShowBack(!showBack);
  };

  return (
    <TinderCard
      onSwipe={(dir) => onSwipe(dir, movie, hasWatched)}
      preventSwipe={['up', 'down']}
      className="swipe-card"
    >
      <div 
        className="card" 
        style={{ 
          backgroundImage: !showBack ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster_Path})` : 'none',
          backgroundColor: showBack ? '#1a1a1a' : 'transparent' 
        }}
      >
        {!showBack ? (
          /* FORSIDE - Bruger dine eksisterende .card-info styles */
          <div className="card-info">
            <h3>{movie.title || movie.original_title}</h3>
            
            <div className="genres">
              {movie.genre_ids?.slice(0, 3).map(id => (
                <span key={id} className="genre-badge">{genreNames[id]}</span>
              ))}
            </div>

            <div className="checkbox-container" onClick={(e) => e.stopPropagation()}>
              <input 
                type="checkbox" 
                id={`seen-${movie.id}`}
                checked={hasWatched} 
                onChange={(e) => setHasWatched(e.target.checked)} 
              />
              <label htmlFor={`seen-${movie.id}`}>Har set den</label>
            </div>

            <button className="info-btn" onClick={toggleFlip}>
              Læs om filmen ℹ️
            </button>
          </div>
        ) : (
          /* BAGSIDE - Vi genbruger .card-info strukturen så det visuelt matcher */
          <div className="card-info" style={{ height: '80%', justifyContent: 'center', background: 'none' }}>
            <h3 style={{ marginBottom: '15px' }}>Om filmen</h3>
            <p style={{ 
              fontSize: '0.85rem', 
              lineHeight: '1.4', 
              overflowY: 'auto', 
              marginBottom: '20px',
              padding: '0 10px' 
            }}>
              {movie.overview || "Ingen beskrivelse tilgængelig på nuværende tidspunkt."}
            </p>
            <button className="info-btn" onClick={toggleFlip}>
              Tilbage til billede
            </button>
          </div>
        )}
      </div>
    </TinderCard>
  );
};

export default MovieCard;