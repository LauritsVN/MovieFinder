using MovieFinderAPI.Model;

namespace MovieFinderAPI.Service
{
    public class MovieService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public MovieService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["Tmdb:ApiKey"];
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

        public async Task<List<TmdbMovieDto>> GetMoviesByGenreAsync(int genreId)
        {
            var url = $"https://api.themoviedb.org/3/discover/movie?api_key={_apiKey}&language=da-DK&with_genres={genreId}&sort_by=popularity.desc";
            var response = await _httpClient.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadFromJsonAsync<TmdbResponse>();
                return content?.Results ?? new List<TmdbMovieDto>();
            }
            return new List<TmdbMovieDto>();
        }

        public async Task<List<TmdbMovieDto>> GetSimilarMoviesAsync(int tmdbId)
        {
            var url = $"https://api.themoviedb.org/3/movie/{tmdbId}/similar?api_key={_apiKey}&language=da-DK";
 
            try
            {
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadFromJsonAsync<TmdbResponse>();
                    return content?.Results ?? new List<TmdbMovieDto>();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fejl ved hentning af lignende film: {ex.Message}");
            }
            return new List<TmdbMovieDto>();
        }

        public async Task<List<TmdbMovieDto>> SearchMovieByNameAsync(string name)
        {
            var url = $"https://api.themoviedb.org/3/search/movie?api_key={_apiKey}&query={Uri.EscapeDataString(name)}&language=da-DK";
            var response = await _httpClient.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadFromJsonAsync<TmdbResponse>();
                return content?.Results ?? new List<TmdbMovieDto>();
            }
            return new List<TmdbMovieDto>();
        }
    }
}
