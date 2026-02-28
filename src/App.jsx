import React, { useState } from 'react';
import { movieApi } from './services/api';
import MovieCard from './components/MovieCard';
import './App.css';

const GENRES = { 
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

function App() {
  const [movies, setMovies] = useState([]);
  const [view, setView] = useState('filter'); 
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({ mood: "", genreId: "", similarTo: "" });

  const handleStart = async () => {
    // Vi sender hele filters objektet til vores api service
    const data = await movieApi.startDiscovery(filters);
    setMovies(data);
    setView('swipe');
  };

  const handleSwipe = async (direction, movie, isWatched) => {
    const swipeData = {
      userId: 1,
      tmdbId: movie.id,
      isLike: direction === 'right',
      hasWatched: isWatched,
      timestamp: new Date().toISOString(),
      originalTitle: movie.title || movie.original_title,
      posterPath: movie.poster_path || movie.poster_Path,
      overview: movie.overview,
    };
    await movieApi.postSwipe(swipeData);
  };

  const showMatches = async () => {
    const data = await movieApi.getMatches();
    setMatches(data);
    setView('matches');
  };

  return (
    <div className="app-container">
      {view === 'filter' && (
        <div className="filter-container">
          <h1 className="title">MovieFinder 🎬</h1>
          
          {/* MOOD INPUT */}
          <div className="filter-group">
            <label>Beskriv dit humør eller ønske</label>
            <input 
              type="text" 
              placeholder="F.eks. En dyster film med et vildt twist" 
              value={filters.mood}
              onChange={(e) => setFilters({...filters, mood: e.target.value})}
            />
          </div>

          {/* GENRE SELECT */}
          <div className="filter-group">
            <label>Vælg Genre</label>
            <select 
              value={filters.genreId} 
              onChange={(e) => setFilters({...filters, genreId: e.target.value})}
            >
              <option value="">Alle kategorier</option>
              {Object.entries(GENRES).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          {/* SIMILAR TO INPUT */}
          <div className="filter-group">
            <label>Noget der minder om...</label>
            <input 
              type="text" 
              placeholder="F.eks. Interstellar" 
              value={filters.similarTo}
              onChange={(e) => setFilters({...filters, similarTo: e.target.value})}
            />
          </div>

          <button className="start-button" onClick={handleStart}>
            Find film til mig
          </button>
        </div>
      )}

      {view === 'swipe' && (
        <div className="swipe-section">
          <button className="back-button" onClick={() => setView('filter')}>
            Skift Filtre
          </button>
          
          <div className="card-container">
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onSwipe={handleSwipe} 
                  genreNames={GENRES} 
                />
              ))
            ) : (
              <div className="no-movies">
                <h2 style={{color: 'white'}}>Ingen film fundet!</h2>
                <button className="back-button" onClick={() => setView('filter')}>Prøv igen</button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'matches' && (
        <div className="matches-section">
          <button className="view-toggle" onClick={() => setView('filter')}>Tilbage til menu</button>
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
      )}

      <button className="matches-bottom" onClick={showMatches}>
        Se mine Matches
      </button>
    </div>
  );
}

export default App;