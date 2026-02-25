using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieFinderAPI.DBAccess;
using MovieFinderAPI.Model;
using MovieFinderAPI.Service;

namespace MovieFinderAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;
        private readonly AppDbContext _context;
        private readonly GroqService _groqService;

        public MoviesController(MovieService movieService, AppDbContext context, GroqService groqService)
        {
            _movieService = movieService;
            _context = context;
            _groqService = groqService;
        }

        [HttpGet("smart-discovery/{userId}")]
        public async Task<IActionResult> GetSmartDiscovery(int userId, [FromQuery] int? genreId, [FromQuery] string? similarTo, [FromQuery] string? mood)
        {
            var finalMovies = new List<TmdbMovieDto>();

            // 1. PRIORITET: Humør/Mood (Gemini AI)
            if (!string.IsNullOrEmpty(mood))
            {
                var titles = await _groqService.GetMovieRecommendationsAsync(mood);
                foreach (var title in titles)
                {
                    var results = await _movieService.SearchMovieByNameAsync(title);
                    if (results.Any()) finalMovies.Add(results.First());
                }
            }
            // 2. PRIORITET: Minder om...
            else if (!string.IsNullOrEmpty(similarTo))
            {
                var searchResults = await _movieService.SearchMovieByNameAsync(similarTo);
                if (searchResults.Any())
                {
                    finalMovies = await _movieService.GetSimilarMoviesAsync(searchResults.First().Id);
                }
            }
            // 3. PRIORITET: Genre
            else if (genreId.HasValue)
            {
                finalMovies = await _movieService.GetMoviesByGenreAsync(genreId.Value);
            }
            // FALLBACK
            else
            {
                finalMovies = await _movieService.GetPopularMoviesAsync();
            }

            // Filtrer film brugeren allerede har set
            var swipedIds = await _context.UserSwipes.Where(s => s.UserId == userId).Select(s => s.TmdbId).ToListAsync();
            var freshMovies = finalMovies.Where(m => !swipedIds.Contains(m.Id)).ToList();

            Console.WriteLine($"Antal film fundet: {finalMovies.Count}. Antal efter filter: {freshMovies.Count}");
            return Ok(freshMovies);
        }

        // Behold dine matches som de er
        [HttpGet("matches/{userId}")]
        public async Task<IActionResult> GetMatches(int userId)
        {
            var matches = await _context.UserSwipes
                .Where(s => s.UserId == userId && s.IsLike == true)
                .OrderByDescending(s => s.Timestamp)
                .ToListAsync();

            return Ok(matches);
        }
    }
}

