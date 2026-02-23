import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import './App.css';

const genreNames = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

function App() {
  const [movies, setMovies] = useState([]);
  
  const API_URL = 'http://192.168.0.211:5084'; 

  useEffect(() => {
    fetch(`${API_URL}/api/movies/discover/1`)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        console.log("Film hentet:", data);
      })
      .catch(err => console.error("Fejl: Husk at køre din API i Visual Studio!", err));
  }, []);

  const swiped = async (direction, movie) => {
  const swipeData = {
    userId: 1, // Midlertidig test-bruger
    tmdbId: movie.id, 
    isLike: direction === 'right',
    timestamp: new Date().toISOString(),
    originalTitle: movie.original_title, 
    posterPath: movie.original_title ? movie.poster_Path : ""
  };

  try {
    const response = await fetch(`${API_URL}/api/swipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(swipeData),
    });

    if (response.ok) {
      console.log(`✅ Gemt: Du ${swipeData.isLike ? 'likede' : 'dislikede'} ${movie.title}`);
    } else {
      const errorData = await response.text();
      console.error('❌ API fejl:', errorData);
    }
  } catch (error) {
    console.error('❌ Netværksfejl:', error);
  }
};

const [showMatches, setShowMatches] = useState(false);
const [matches, setMatches] = useState([]);

// Funktion til at hente matches fra din API
const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_URL}/api/movies/matches/1`); // 1 er dit UserId
    if (response.ok) {
      const data = await response.json();
      setMatches(data);
      setShowMatches(true);
    }
  } catch (error) {
    console.error("Kunne ikke hente matches:", error);
  }
};

return (
  <div className="app-container">
    <button className="view-toggle" onClick={showMatches ? () => setShowMatches(false) : fetchMatches}>
      {showMatches ? "Tilbage til Swipe" : "Se mine Matches ❤️"}
    </button>

    {showMatches ? (
      <div className="matches-section">
        <h2>Dine Matches</h2>
        <div className="matches-grid">
          {matches
            .filter(match => match.posterPath || match.poster_Path)
            .map((match) => (
              <div key={match.id} className="match-card">
                <img src={`https://image.tmdb.org/t/p/w200${match.posterPath || match.poster_Path}`} alt={match.original_title || match.title} />
                <p>{match.original_title || match.title}</p>
              </div>
            ))}
        </div>
      </div>
    ) : (
      /* --- START SWIPE MODE --- */
      <div className="card-container">
        {movies.map((movie) => (
          <TinderCard 
            key={movie.id} 
            onSwipe={(dir) => swiped(dir, movie)}
            preventSwipe={['up', 'down']}
            className="swipe-card"
          >
            <div 
              className="card"
              style={{ 
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.posterPath || movie.poster_Path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="card-info">
                <h3>{movie.original_title}</h3>
                <div className="genres">
                  {movie.genre_ids && movie.genre_ids.map(id => (
                    <span key={id} className="genre-badge">
                      {genreNames[id]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div> /* Lukker card-container */
      /* --- SLUT SWIPE MODE --- */
    )} 
  </div> /* <--- DETTE ER DEN MANGLENDE DIV DER LUKKER APP-CONTAINER */
);
}

export default App;