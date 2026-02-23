using System.ComponentModel.DataAnnotations;

namespace MovieFinderAPI.Models
{
    public class Movie
    {
        [Key] // Vi fortæller EF at dette er ID'et
        public int TmdbId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? PosterPath { get; set; }
        public List<int> GenreIds { get; set; }
    }
}
