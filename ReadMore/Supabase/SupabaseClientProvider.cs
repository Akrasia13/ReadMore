using Supabase;

namespace ReadMore.Supabase;

public interface ISupabaseClientProvider
{
    Task<Client> GetClientAsync();
}

public class SupabaseClientProvider : ISupabaseClientProvider
{
    private readonly IConfiguration _config;
    private Client? _client;
    private readonly object _lock = new();

    public SupabaseClientProvider(IConfiguration config) => _config = config;

    public Task<Client> GetClientAsync()
    {
        if (_client != null) return Task.FromResult(_client);

        lock (_lock)
        {
            if (_client != null) return Task.FromResult(_client);

            var url = _config["Supabase:Url"];
            var key = _config["Supabase:AnonKey"];

            if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(key))
                throw new InvalidOperationException("Supabase configuration missing (Supabase:Url / Supabase:AnonKey).");

            var options = new SupabaseOptions
            {
                AutoConnectRealtime = true
            };

            _client = new Client(url, key, options);
        }

        return Task.FromResult(_client!);
    }
}