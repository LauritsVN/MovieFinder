const API_URL = 'http://192.168.0.211:5084/api';

export const movieApi = {
  startDiscovery: async (filters) => {
    let url = `${API_URL}/movies/smart-discovery/1?`;
    if (filters.genreId) url += `genreId=${filters.genreId}&`;
    if (filters.similarTo) url += `similarTo=${encodeURIComponent(filters.similarTo)}&`;
    if (filters.mood) url += `mood=${encodeURIComponent(filters.mood)}`;
    
    const res = await fetch(url);
    return res.json();
  },

  postSwipe: async (swipeData) => {
    return fetch(`${API_URL}/swipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(swipeData),
    });
  },

  getMatches: async (userId = 1) => {
    const res = await fetch(`${API_URL}/movies/matches/${userId}`);
    return res.json();
  }
};