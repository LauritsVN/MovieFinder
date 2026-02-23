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

        public MoviesController(MovieService movieService, AppDbContext context)
        {
            _movieService = movieService;
            _context = context;
        }

        [HttpGet("discover")]
        [HttpGet("discover/{userId}")] // Vi tilføjer userId til ruten
        public async Task<IActionResult> GetMoviesToSwipe(int userId)
        {
            // 1. Hent de populære film fra TMDB 
            var allMovies = await _movieService.GetPopularMoviesAsync();

            // 2. Find alle film-IDs som denne bruger ALLEREDE har swipet på (både likes og dislikes)
            var swipedMovieIds = await _context.UserSwipes
                .Where(s => s.UserId == userId)
                .Select(s => s.TmdbId)
                .ToListAsync();

            // 3. Filtrér listen: Behold kun de film, hvis ID IKKE findes i databasen
            var freshMovies = allMovies
                .Where(m => !swipedMovieIds.Contains(m.Id))
                .ToList();

            return Ok(freshMovies);
        }

        [HttpGet("recommendations/{userId}")]
        public async Task<IActionResult> GetPersonalRecommendations(int userId)
        {
            // 1. Find film brugeren har liket i din database
            var likedMovieIds = await _context.UserSwipes
                .Where(s => s.UserId == userId && s.IsLike == true)
                .Select(s => s.TmdbId)
                .ToListAsync();

            if (!likedMovieIds.Any())
            {
                // Hvis brugeren er ny, giv dem bare populære film
                return Ok(await _movieService.GetPopularMoviesAsync());
            }

            var allRecs = new List<TmdbMovieDto>();

            // 2. Hent anbefalinger for de 3 nyeste likes 
            foreach (var id in likedMovieIds.TakeLast(3))
            {
                var recs = await _movieService.GetRecommendationsForMovieAsync(id);
                allRecs.AddRange(recs);
            }

            // 3. Rens listen: Fjern film brugeren ALLEREDE har swipet på
            var alreadySwipedIds = await _context.UserSwipes
                .Where(s => s.UserId == userId)
                .Select(s => s.TmdbId)
                .ToListAsync();

            var filteredRecs = allRecs
                .Where(m => !alreadySwipedIds.Contains(m.Id))
                .GroupBy(m => m.Id) // Fjern dubletter
                .Select(g => g.First())
                .Take(20) // Send top 20 tilbage
                .ToList();

            return Ok(filteredRecs);
        }

        [HttpGet("matches/{userId}")]
        public async Task<IActionResult> GetMatches(int userId)
        {
            // Hent alle swipes for brugeren, der er "likes"
            var matches = await _context.UserSwipes
                .Where(s => s.UserId == userId && s.IsLike)
                .OrderByDescending(s => s.Timestamp)
                .ToListAsync();

            return Ok(matches);
        }
    }
}

