using MovieFinderAPI.Model;

namespace MovieFinderAPI.Service
{
    public class MovieService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "3a00cf58a25a7d7e969e59bc7153b626";

        public MovieService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<TmdbMovieDto>> GetPopularMoviesAsync()
        {
            // Vi henter populære film som start til swiping
            var response = await _httpClient.GetFromJsonAsync<TmdbResponse>(
                $"https://api.themoviedb.org/3/movie/popular?api_key={_apiKey}&language=da-DK"
            );

            return response?.Results ?? new List<TmdbMovieDto>();
        }

        public async Task<List<TmdbMovieDto>> GetRecommendationsForMovieAsync(int tmdbId)
        {
            var response = await _httpClient.GetFromJsonAsync<TmdbResponse>(
                $"https://api.themoviedb.org/3/movie/{tmdbId}/recommendations?api_key={_apiKey}&language=da-DK"
            );

            return response?.Results ?? new List<TmdbMovieDto>();
        }
    }
}
