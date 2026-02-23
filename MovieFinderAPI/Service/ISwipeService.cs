using MovieFinderAPI.Model;

namespace MovieFinderAPI.Service
{
    public interface ISwipeService
    {
        Task<bool> SaveSwipeAsync(UserSwipeDto swipe);
    }
}