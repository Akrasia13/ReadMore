using Microsoft.Extensions.Options;
using Supabase;

namespace ReadMore.Supabase;

public interface ISupabaseClientProvider
{
    Task<Client> GetClientAsync();
}

public class SupabaseClientProvider : ISupabaseClientProvider
{
    private readonly IConfiguration _options;
    private Client? _client;

    public SupabaseClientProvider(IConfiguration opt) => _options = opt;

    public async Task<Client> GetClientAsync()
    {
        if (_client != null)
        {
            return _client;
        }

        var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
        var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

        var options = new SupabaseOptions
        {
            AutoConnectRealtime = true
        };

        var client = new Client(url, key, options);
        return client;
    }
}