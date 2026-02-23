using System.ComponentModel.DataAnnotations;

namespace MovieFinderAPI.Models
{
    public class UserSwipe
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TmdbId { get; set; }
        public bool IsLike { get; set; } // True = Højre, False = Venstre
        public DateTime Timestamp { get; set; } = DateTime.Now;

        public string OriginalTitle { get; set; } = string.Empty;
        public string PosterPath { get; set; } = string.Empty;
    }
}
