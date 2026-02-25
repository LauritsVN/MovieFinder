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
  const [showMatches, setShowMatches] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isFiltering, setIsFiltering] = useState(true); // Start på filter-menuen
  const [flippedCard, setFlippedCard] = useState(null); // Til at vise info/beskrivelse

  // Filter states
  const [selectedGenre, setSelectedGenre] = useState("");
  const [similarMovie, setSimilarMovie] = useState("");
  const [mood, setMood] = useState("");

  const API_URL = 'http://192.168.0.211:5084';

  // Henter film baseret på dine filtre
  const startDiscovery = async () => {
    try {
      let url = `${API_URL}/api/movies/smart-discovery/1?`;
      if (selectedGenre) url += `genreId=${selectedGenre}&`;
      if (similarMovie) url += `similarTo=${encodeURIComponent(similarMovie)}`;
      if(mood) url += `mood=${encodeURIComponent(mood)}`;

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data); 
      setIsFiltering(false);
      setFlippedCard(null);
    } catch (err) {
      console.error("Kunne ikke hente film:", err);
    }
  };

  const swiped = async (direction, movie, customIsLike = null, customHasWatched = true) => {
    const swipeData = {
      userId: 1,
      tmdbId: movie.id,
      // Hvis vi swiper normalt: højre = like. Hvis vi trykker "Set", sender vi custom værdier.
      isLike: customIsLike !== null ? customIsLike : direction === 'right',
      hasWatched: customHasWatched,
      timestamp: new Date().toISOString(),
      originalTitle: movie.title || movie.original_title,
      posterPath: movie.poster_path || movie.poster_Path
    };

    try {
      await fetch(`${API_URL}/api/swipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swipeData),
      });
      console.log(`Gemt swipe for: ${swipeData.originalTitle}`);
    } catch (error) {
      console.error('Fejl ved gem:', error);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await fetch(`${API_URL}/api/movies/matches/1`);
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
        setShowMatches(true);
      }
    } catch (error) {
      console.error("Kunne ikke hente matches:", error);
    }
  };

  if (showMatches) {
    return (
      <div className="app-container">
        <button className="view-toggle" onClick={() => setShowMatches(false)}>Tilbage til menu</button>
        <div className="matches-section">
          <h2>Dine Matches ❤️</h2>
          <div className="matches-grid">
            {matches.map((match) => (
              <div key={match.id} className="match-card">
                <img src={`https://image.tmdb.org/t/p/w200${match.posterPath}`} alt={match.originalTitle} />
                <p>{match.originalTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {isFiltering ? (
        /* --- MENU SKÆRM --- */
        <div className="filter-container">
          <h1 className="title">MovieFinder 🎬</h1>
          <div className="filter-group">
            <label>Beskriv dit humør eller ønske</label>
            <input 
              type="text" 
              placeholder="F.eks. En dyster film med et vildt twist" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Vælg Genre</label>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">Alle kategorier</option>
              {Object.entries(genreNames).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Noget der minder om...</label>
            <input 
              type="text" 
              placeholder="F.eks. Interstellar" 
              value={similarMovie}
              onChange={(e) => setSimilarMovie(e.target.value)}
            />
          </div>

          <button className="start-button" onClick={startDiscovery}>Find film til mig</button>
        </div>
      ) : (
        /* --- SWIPE SKÆRM --- */
        <div className="swipe-section">
          <button className="back-button" onClick={() => setIsFiltering(true)}>Skift Filtre</button>
          
          <div className="card-container">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <TinderCard 
                  key={movie.id} 
                  onSwipe={(dir) => swiped(dir, movie)}
                  preventSwipe={['up', 'down']}
                  className="swipe-card"
                >
                  <div 
                    className={`card ${flippedCard === movie.id ? 'is-flipped' : ''}`}
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster_Path})` }}
                  >
                    <div className="card-info">
                      <h3>{movie.title || movie.original_title}</h3>
                      
                      {/* En lille knap til at se beskrivelse */}
                      <button className="info-btn" onClick={(e) => {
                         e.stopPropagation();
                         alert(movie.overview); // Simpel visning af beskrivelse
                      }}>Info</button>

                      <div className="genres">
                        {movie.genre_ids?.map(id => (
                          <span key={id} className="genre-badge">{genreNames[id]}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TinderCard>
              ))
            ) : (
              <div className="no-movies">
                <h2>Ingen film fundet!</h2>
                <p>Prøv at ændre dine filtre, vælg en anden genre eller mood.</p>
                <button onClick={() => setIsFiltering(true)}>Gå tilbage</button>
              </div>
            )}
          </div>
        </div>
      )}

      <button className="matches-bottom" onClick={fetchMatches}>Se mine Matches</button>
    </div>
  );
}

export default App;