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
                new { role = "system", content = @"You are an expert movie curator. Your goal is to translate a user's free-text description into 5 perfect movie recommendations.
        
                    Rules for selection:
                     1. ANALYZE: Identify genres, themes, time periods, and visual styles in the user's text.
                     2. QUALITY: Only suggest movies with high critical acclaim (IMDb 7.0+).
                     3. NO TRIVIALITY: Avoid the most obvious mainstream hits unless they perfectly fit (e.g., don't just suggest 'Star Wars' for every space query).
                     4. FORMAT: Return ONLY a comma-separated list of original English titles. No intro, no chat." },
                new { role = "user", content = $"Based on this description: '{mood}', find 5 movies that match these specific criteria and vibes." }
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

                return aiText?.Split(',')
                             .Select(t => t.Trim().Trim('"')) 
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


