warning: in the working copy of 'src/App.jsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.css b/src/App.css[m
[1mindex 6989a44..04ca700 100644[m
[1m--- a/src/App.css[m
[1m+++ b/src/App.css[m
[36m@@ -99,6 +99,10 @@[m [mbody, html {[m
   text-align: center;[m
   width: calc(100% - 40px);[m
   max-width: 300px;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  gap: 8px;[m
   backdrop-filter: blur(6px);[m
   -webkit-backdrop-filter: blur(6px);[m
   -webkit-tap-highlight-color: transparent;[m
[36m@@ -130,6 +134,83 @@[m [mbody, html {[m
 .genre-container { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 6px; }[m
 .genre-tag { background: rgba(255,255,255,0.12); color: #fff; padding: 4px 8px; border-radius: 999px; font-size: 0.75rem; line-height:1; opacity:0.95; }[m
 [m
[32m+[m[32m.checkbox-container {[m
[32m+[m[32m  margin-top: 8px;[m
[32m+[m[32m  display: inline-flex;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  gap: 8px;[m
[32m+[m[32m  padding: 6px 10px;[m
[32m+[m[32m  border-radius: 999px;[m
[32m+[m[32m  background: rgba(255, 255, 255, 0.12);[m
[32m+[m[32m  border: 1px solid rgba(255, 255, 255, 0.18);[m
[32m+[m[32m  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.24);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.checkbox-container input[type="checkbox"] {[m
[32m+[m[32m  appearance: none;[m
[32m+[m[32m  -webkit-appearance: none;[m
[32m+[m[32m  width: 18px;[m
[32m+[m[32m  height: 18px;[m
[32m+[m[32m  margin: 0;[m
[32m+[m[32m  border-radius: 6px;[m
[32m+[m[32m  border: 2px solid rgba(255, 255, 255, 0.85);[m
[32m+[m[32m  background: rgba(0, 0, 0, 0.25);[m
[32m+[m[32m  display: grid;[m
[32m+[m[32m  place-content: center;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  transition: all 0.2s ease;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.checkbox-container input[type="checkbox"]::after {[m
[32m+[m[32m  content: "";[m
[32m+[m[32m  width: 5px;[m
[32m+[m[32m  height: 9px;[m
[32m+[m[32m  border-right: 2px solid #071024;[m
[32m+[m[32m  border-bottom: 2px solid #071024;[m
[32m+[m[32m  transform: rotate(45deg) scale(0);[m
[32m+[m[32m  transition: transform 0.15s ease;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.checkbox-container input[type="checkbox"]:checked {[m
[32m+[m[32m  border-color: transparent;[m
[32m+[m[32m  background: linear-gradient(90deg, #ff9a9e 0%, #bde0fe 100%);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.checkbox-container input[type="checkbox"]:checked::after {[m
[32m+[m[32m  transform: rotate(45deg) scale(1);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.checkbox-container label {[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m  font-size: 0.82rem;[m
[32m+[m[32m  font-weight: 700;[m
[32m+[m[32m  letter-spacing: 0.2px;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.info-btn {[m
[32m+[m[32m  margin-top: 2px;[m
[32m+[m[32m  background: linear-gradient(90deg, #ff9a9e 0%, #bde0fe 100%);[m
[32m+[m[32m  color: #071024;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m  border-radius: 999px;[m
[32m+[m[32m  padding: 7px 14px;[m
[32m+[m[32m  font-size: 0.78rem;[m
[32m+[m[32m  font-weight: 800;[m
[32m+[m[32m  letter-spacing: 0.2px;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.24);[m
[32m+[m[32m  transition: transform 0.18s ease, filter 0.2s ease;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.info-btn:hover {[m
[32m+[m[32m  filter: brightness(1.03);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.info-btn:active {[m
[32m+[m[32m  transform: translateY(1px);[m
[32m+[m[32m}[m
[32m+[m
 /* Matches view styling */[m
 .view-toggle {[m
   margin: 16px 0;[m
[1mdiff --git a/src/App.jsx b/src/App.jsx[m
[1mindex a5478ef..a5a9391 100644[m
[1m--- a/src/App.jsx[m
[1m+++ b/src/App.jsx[m
[36m@@ -1,188 +1,72 @@[m
[31m-import React, { useState, useEffect } from 'react';[m
[31m-import TinderCard from 'react-tinder-card';[m
[32m+[m[32mimport React, { useState } from 'react';[m
[32m+[m[32mimport { movieApi } from './Services/api';[m
[32m+[m[32mimport MovieCard from './Components/MovieCard';[m
 import './App.css';[m
 [m
[31m-const genreNames = {[m
[31m-  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",[m
[32m+[m[32m/*Genre id passer til disse genrer*/[m[41m [m
[32m+[m[32mconst GENRES = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",[m
   99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",[m
   27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",[m
[31m-  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"[m
[31m-};[m
[32m+[m[32m  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"};[m
 [m
[32m+[m[32m  /*Starter på filter page og movies gemmer de movies der bliver hentet fra Tmbd, Groq */[m
 function App() {[m
   const [movies, setMovies] = useState([]);[m
[31m-  const [showMatches, setShowMatches] = useState(false);[m
[32m+[m[32m  const [view, setView] = useState('filter'); // 'filter', 'swipe', 'matches'[m
   const [matches, setMatches] = useState([]);[m
[31m-  const [isFiltering, setIsFiltering] = useState(true); // Start på filter-menuen[m
[31m-  const [flippedCard, setFlippedCard] = useState(null); // Til at vise info/beskrivelse[m
[32m+[m[32m  const [filters, setFilters] = useState({ mood: "", genreId: "", similarTo: "" });[m
 [m
[31m-  // Filter states[m
[31m-  const [selectedGenre, setSelectedGenre] = useState("");[m
[31m-  const [similarMovie, setSimilarMovie] = useState("");[m
[31m-  const [mood, setMood] = useState("");[m
[31m-[m
[31m-  const API_URL = 'http://192.168.0.211:5084';[m
[31m-[m
[31m-  // Henter film baseret på dine filtre[m
[31m-  const startDiscovery = async () => {[m
[31m-    try {[m
[31m-      let url = `${API_URL}/api/movies/smart-discovery/1?`;[m
[31m-      if (selectedGenre) url += `genreId=${selectedGenre}&`;[m
[31m-      if (similarMovie) url += `similarTo=${encodeURIComponent(similarMovie)}`;[m
[31m-      if(mood) url += `mood=${encodeURIComponent(mood)}`;[m
[31m-[m
[31m-      const res = await fetch(url);[m
[31m-      const data = await res.json();[m
[31m-      setMovies(data); [m
[31m-      setIsFiltering(false);[m
[31m-      setFlippedCard(null);[m
[31m-    } catch (err) {[m
[31m-      console.error("Kunne ikke hente film:", err);[m
[31m-    }[m
[32m+[m[32m  /* Kalder AI-tjeneste og ændrer view til swipe */[m
[32m+[m[32m  const handleStart = async () => {[m
[32m+[m[32m    const data = await movieApi.startDiscovery(filters);[m
[32m+[m[32m    setMovies(data);[m
[32m+[m[32m    setView('swipe');[m
   };[m
[31m-[m
[31m-  const swiped = async (direction, movie, customIsLike = null, customHasWatched = true) => {[m
[32m+[m[32m  /* Hver gang der bliver swiped venstre, kaldes API */[m
[32m+[m[32m  const handleSwipe = async (direction, movie, isWatched) => {[m
     const swipeData = {[m
       userId: 1,[m
       tmdbId: movie.id,[m
[31m-      // Hvis vi swiper normalt: højre = like. Hvis vi trykker "Set", sender vi custom værdier.[m
[31m-      isLike: customIsLike !== null ? customIsLike : direction === 'right',[m
[31m-      hasWatched: customHasWatched,[m
[31m-      timestamp: new Date().toISOString(),[m
[32m+[m[32m      isLike: direction === 'right',[m
[32m+[m[32m      hasWatched: isWatched,[m
       originalTitle: movie.title || movie.original_title,[m
       posterPath: movie.poster_path || movie.poster_Path[m
     };[m
[31m-[m
[31m-    try {[m
[31m-      await fetch(`${API_URL}/api/swipes`, {[m
[31m-        method: 'POST',[m
[31m-        headers: { 'Content-Type': 'application/json' },[m
[31m-        body: JSON.stringify(swipeData),[m
[31m-      });[m
[31m-      console.log(`Gemt swipe for: ${swipeData.originalTitle}`);[m
[31m-    } catch (error) {[m
[31m-      console.error('Fejl ved gem:', error);[m
[31m-    }[m
[32m+[m[32m    await movieApi.postSwipe(swipeData);[m
   };[m
[31m-[m
[31m-  const fetchMatches = async () => {[m
[31m-    try {[m
[31m-      const response = await fetch(`${API_URL}/api/movies/matches/1`);[m
[31m-      if (response.ok) {[m
[31m-        const data = await response.json();[m
[31m-        setMatches(data);[m
[31m-        setShowMatches(true);[m
[31m-      }[m
[31m-    } catch (error) {[m
[31m-      console.error("Kunne ikke hente matches:", error);[m
[31m-    }[m
[32m+[m[32m /* Henter matches fra db og skifter view til matches */[m
[32m+[m[32m  const showMatches = async () => {[m
[32m+[m[32m    const data = await movieApi.getMatches();[m
[32m+[m[32m    setMatches(data);[m
[32m+[m[32m    setView('matches');[m
   };[m
 [m
[31m-  if (showMatches) {[m
[31m-    return ([m
[31m-      <div className="app-container">[m
[31m-        <button className="view-toggle" onClick={() => setShowMatches(false)}>Tilbage til menu</button>[m
[31m-        <div className="matches-section">[m
[31m-          <h2>Dine Matches ❤️</h2>[m
[31m-          <div className="matches-grid">[m
[31m-            {matches.map((match) => ([m
[31m-              <div key={match.id} className="match-card">[m
[31m-                <img src={`https://image.tmdb.org/t/p/w200${match.posterPath}`} alt={match.originalTitle} />[m
[31m-                <p>{match.originalTitle}</p>[m
[31m-              </div>[m
[31m-            ))}[m
[31m-          </div>[m
[31m-        </div>[m
[31m-      </div>[m
[31m-    );[m
[31m-  }[m
[31m-[m
   return ([m
     <div className="app-container">[m
[31m-      {isFiltering ? ([m
[31m-        /* --- MENU SKÆRM --- */[m
[32m+[m[32m      {view === 'filter' && ([m
         <div className="filter-container">[m
[31m-          <h1 className="title">MovieFinder 🎬</h1>[m
[31m-          <div className="filter-group">[m
[31m-            <label>Beskriv dit humør eller ønske</label>[m
[31m-            <input [m
[31m-              type="text" [m
[31m-              placeholder="F.eks. En dyster film med et vildt twist" [m
[31m-              value={mood}[m
[31m-              onChange={(e) => setMood(e.target.value)}[m
[31m-            />[m
[31m-          </div>[m
[31m-          [m
[31m-          <div className="filter-group">[m
[31m-            <label>Vælg Genre</label>[m
[31m-            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>[m
[31m-              <option value="">Alle kategorier</option>[m
[31m-              {Object.entries(genreNames).map(([id, name]) => ([m
[31m-                <option key={id} value={id}>{name}</option>[m
[31m-              ))}[m
[31m-            </select>[m
[31m-          </div>[m
[31m-[m
[31m-          <div className="filter-group">[m
[31m-            <label>Noget der minder om...</label>[m
[31m-            <input [m
[31m-              type="text" [m
[31m-              placeholder="F.eks. Interstellar" [m
[31m-              value={similarMovie}[m
[31m-              onChange={(e) => setSimilarMovie(e.target.value)}[m
[31m-            />[m
[31m-          </div>[m
[31m-[m
[31m-          <button className="start-button" onClick={startDiscovery}>Find film til mig</button>[m
[32m+[m[32m          <h1>MovieFinder 🎬</h1>[m
[32m+[m[32m          <input placeholder="Humør..." onChange={e => setFilters({...filters, mood: e.target.value})} />[m
[32m+[m[32m          <button onClick={handleStart}>Find film</button>[m
         </div>[m
[31m-      ) : ([m
[31m-        /* --- SWIPE SKÆRM --- */[m
[32m+[m[32m      )}[m
[32m+[m
[32m+[m[32m      {view === 'swipe' && ([m
         <div className="swipe-section">[m
[31m-          <button className="back-button" onClick={() => setIsFiltering(true)}>Skift Filtre</button>[m
[31m-          [m
[32m+[m[32m          <button onClick={() => setView('filter')}>Tilbage</button>[m
           <div className="card-container">[m
[31m-            {movies.length > 0 ? ([m
[31m-              movies.map((movie) => ([m
[31m-                <TinderCard [m
[31m-                  key={movie.id} [m
[31m-                  onSwipe={(dir) => swiped(dir, movie)}[m
[31m-                  preventSwipe={['up', 'down']}[m
[31m-                  className="swipe-card"[m
[31m-                >[m
[31m-                  <div [m
[31m-                    className={`card ${flippedCard === movie.id ? 'is-flipped' : ''}`}[m
[31m-                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster_Path})` }}[m
[31m-                  >[m
[31m-                    <div className="card-info">[m
[31m-                      <h3>{movie.title || movie.original_title}</h3>[m
[31m-                      [m
[31m-                      {/* En lille knap til at se beskrivelse */}[m
[31m-                      <button className="info-btn" onClick={(e) => {[m
[31m-                         e.stopPropagation();[m
[31m-                         alert(movie.overview); // Simpel visning af beskrivelse[m
[31m-                      }}>Info</button>[m
[31m-[m
[31m-                      <div className="genres">[m
[31m-                        {movie.genre_ids?.map(id => ([m
[31m-                          <span key={id} className="genre-badge">{genreNames[id]}</span>[m
[31m-                        ))}[m
[31m-                      </div>[m
[31m-                    </div>[m
[31m-                  </div>[m
[31m-                </TinderCard>[m
[31m-              ))[m
[31m-            ) : ([m
[31m-              <div className="no-movies">[m
[31m-                <h2>Ingen film fundet!</h2>[m
[31m-                <p>Prøv at ændre dine filtre, vælg en anden genre eller mood.</p>[m
[31m-                <button onClick={() => setIsFiltering(true)}>Gå tilbage</button>[m
[31m-              </div>[m
[31m-            )}[m
[32m+[m[32m          /* Laver MovieCard for hver film i array */[m
[32m+[m[32m            {movies.map(m => <MovieCard key={m.id} movie={m} onSwipe={handleSwipe} genreNames={GENRES} />)}[m
           </div>[m
         </div>[m
       )}[m
 [m
[31m-      <button className="matches-bottom" onClick={fetchMatches}>Se mine Matches</button>[m
[32m+[m[32m      {view === 'matches' && ([m
[32m+[m[32m         /* Render din MatchList komponent her */[m
[32m+[m[32m         <button onClick={() => setView('filter')}>Menu</button>[m
[32m+[m[32m      )}[m
[32m+[m
[32m+[m[32m      <button className="matches-bottom" onClick={showMatches}>Mine Matches</button>[m
     </div>[m
   );[m
 }[m
[1mdiff --git a/src/Components/MovieCard.jsx b/src/Components/MovieCard.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..1683e70[m
[1m--- /dev/null[m
[1m+++ b/src/Components/MovieCard.jsx[m
[36m@@ -0,0 +1,55 @@[m
[32m+[m[32mimport React, { useState } from 'react';[m
[32m+[m[32mimport TinderCard from 'react-tinder-card';[m
[32m+[m
[32m+[m[32mconst MovieCard = ({ movie, onSwipe, genreNames }) => {[m
[32m+[m[32m  const [hasWatched, setHasWatched] = useState(false);[m
[32m+[m[32m  const [showBack, setShowBack] = useState(false); // Ny state til bagsiden[m
[32m+[m
[32m+[m[32m  return ([m
[32m+[m[32m    <TinderCard[m[41m [m
[32m+[m[32m      onSwipe={(dir) => onSwipe(dir, movie, hasWatched)}[m
[32m+[m[32m      preventSwipe={['up', 'down']}[m
[32m+[m[32m      className="swipe-card"[m
[32m+[m[32m    >[m
[32m+[m[32m      <div[m[41m [m
[32m+[m[32m        className={`card ${showBack ? 'flipped' : ''}`}[m[41m [m
[32m+[m[32m        onClick={() => setShowBack(!showBack)} // Klik for at flippe[m
[32m+[m[32m      >[m
[32m+[m[32m        {/* FORSIDE */}[m
[32m+[m[32m        {!showBack ? ([m
[32m+[m[32m          <div[m[41m [m
[32m+[m[32m            className