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
  try {
    const res = await fetch(`${API_URL}/movies/matches/${userId}`);
    if (!res.ok) throw new Error(`Server fejl: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("API fejl i getMatches:", err);
    return []; // Returner et tomt array så appen ikke crasher
  }
}
};