using System.Text.Json.Serialization;

namespace MovieFinderAPI.Model
{
    public class TmdbResponse
    {
        public List<TmdbMovieDto> Results { get; set; } = new();
    }

    public class TmdbMovieDto
    {
        public int Id { get; set; }

        [JsonPropertyName("original_title")]
        public string Title { get; set; } = string.Empty;
        public string? Poster_Path { get; set; }
        public string Overview { get; set; } = string.Empty;

        [JsonPropertyName("genre_ids")]
        public List<int> GenreIds { get; set; } = new List<int>();
    }
}
