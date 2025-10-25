using Supabase.Gotrue;

namespace ReadMore.Supabase;

public interface IAuthService
{
 Task SendMagicLinkIfUserExistsAsync(string email);
}

public class AuthService : IAuthService
{
     private readonly ISupabaseClientProvider _provider;

     public AuthService(ISupabaseClientProvider provider) => _provider = provider;

     public async Task SendMagicLinkIfUserExistsAsync(string email)
     {
         if (string.IsNullOrWhiteSpace(email)) return;
         var client = await _provider.GetClientAsync();
         try
         {
             var opts = new SignInWithPasswordlessEmailOptions(email);
             await client.Auth.SignInWithOtp(opts);
         }
         catch
         {
            // Ignore
         }
     }
}
