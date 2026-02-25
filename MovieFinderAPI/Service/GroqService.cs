using System.Net.Http.Json;
using System.Text.Json;

namespace MovieFinderAPI.Service
{
    public class GroqService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey; 
        private const string GroqUrl = "https://api.groq.com/openai/v1/chat/completions";

        public GroqService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["Groq:ApiKey"];
        }

        public async Task<List<string>> GetMovieRecommendationsAsync(string mood)
        {
            try
            {
                var requestBody = new
                {
                    // Det korrekte model-id for Llama 3.1 8B på Groq
                    model = "llama-3.1-8b-instant",
                    messages = new[]
                    {
                new { role = "system", content = @"You are a professional movie expert. Follow these rules strictly:
                             1. Return ONLY a comma-separated list of movie titles. No introduction, no numbering, and no closing remarks.
                             2. Only suggest movies released from the year 2000 to the present.
                             3. Only suggest high-quality movies with a minimum rating of 5.0 on IMDb or 50% on Rotten Tomatoes.
                             4. Always provide the original English titles for database compatibility.
                             5. Ensure the recommendations are highly relevant to the user's specific mood." },
                new { role = "user", content = $"Provide 5 top-rated English movie titles from after the year 2000 that perfectly match this mood: '{mood}'." }
            },
                    temperature = 0.5, // Lavere temperatur gør svaret mere fokuseret og konsistent
                    max_tokens = 100   // Vi har kun brug for titlerne, så vi sparer på tokens
                };

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);

                var response = await _httpClient.PostAsJsonAsync("https://api.groq.com/openai/v1/chat/completions", requestBody);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    // Her får du den præcise forklaring, hvis det stadig fejler
                    Console.WriteLine($"Groq API Fejl: {response.StatusCode} - {error}");
                    return GetFallbackMovies();
                }

                var result = await response.Content.ReadFromJsonAsync<JsonElement>();
                var aiText = result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
                Console.WriteLine($"AI foreslog disse film: {aiText}");

                return aiText?.Split(',')
                             .Select(t => t.Trim().Trim('"')) // Fjerner både mellemrum og eventuelle citationstegn
                             .Where(t => !string.IsNullOrWhiteSpace(t))
                             .ToList() ?? GetFallbackMovies();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"System Fejl ved Groq kald: {ex.Message}");
                return GetFallbackMovies();
            }
        }

        private List<string> GetFallbackMovies() => new List<string> { "The Shawshank Redemption", "Pulp Fiction", "Forrest Gump" };
    }
}


