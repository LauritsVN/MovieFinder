import React, { useState } from 'react';
import { movieApi } from './Services/api';
import MovieCard from './Components/MovieCard';
import './App.css';

const GENRES = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"};

function App() {
  const [movies, setMovies] = useState([]);
  const [view, setView] = useState('filter'); // 'filter', 'swipe', 'matches'
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({ mood: "", genreId: "", similarTo: "" });

  const handleStart = async () => {
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
      originalTitle: movie.title || movie.original_title,
      posterPath: movie.poster_path || movie.poster_Path
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
          <h1>MovieFinder 🎬</h1>
          <input placeholder="Humør..." onChange={e => setFilters({...filters, mood: e.target.value})} />
          <button onClick={handleStart}>Find film</button>
        </div>
      )}

      {view === 'swipe' && (
        <div className="swipe-section">
          <button onClick={() => setView('filter')}>Tilbage</button>
          <div className="card-container">
            {movies.map(m => <MovieCard key={m.id} movie={m} onSwipe={handleSwipe} genreNames={GENRES} />)}
          </div>
        </div>
      )}

      {view === 'matches' && (
         /* Render din MatchList komponent her */
         <button onClick={() => setView('filter')}>Menu</button>
      )}

      <button className="matches-bottom" onClick={showMatches}>Mine Matches</button>
    </div>
  );
}