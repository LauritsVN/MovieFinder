using MovieFinderAPI.DBAccess;
using MovieFinderAPI.Model;
using MovieFinderAPI.Models;

namespace MovieFinderAPI.Service
{
    public class SwipesService : ISwipeService
    {
        private readonly AppDbContext _context;
        public SwipesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveSwipeAsync(UserSwipeDto swipe)
        {
            try
            {
                var userSwipe = new UserSwipe
                {
                    UserId = swipe.UserId,
                    TmdbId = swipe.TmdbId,
                    IsLike = swipe.IsLike,
                    OriginalTitle = swipe.OriginalTitle, // Husk denne
                    PosterPath = swipe.PosterPath,
                    Timestamp = swipe.Timestamp
                };
                _context.UserSwipes.Add(userSwipe);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}