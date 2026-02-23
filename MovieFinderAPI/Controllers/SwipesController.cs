using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieFinderAPI.Model;
using MovieFinderAPI.Service;

namespace MovieFinderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SwipesController : ControllerBase
    {
        private readonly ISwipeService _swipeService;

        public SwipesController(ISwipeService swipeService)
        {
            _swipeService = swipeService;
        }

        [HttpPost]
        public async Task<IActionResult> PostSwipe(UserSwipeDto swipe)
        {
            var result = await _swipeService.SaveSwipeAsync(swipe);
            if(result) return Ok();
            return BadRequest("Failed to save swipe");
        }

    }
}
