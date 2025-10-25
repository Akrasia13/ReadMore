//using Supabase.Gotrue;

//namespace ReadMore.Supabase;

//public class AuthService
//{
// private readonly ISupabaseClientProvider _provider;

// public AuthService(ISupabaseClientProvider provider)
// {
//    _provider = provider;
// }

// public async Task SendMagicLinkAsync(string email)
// {
//    var client = await _provider.GetClientAsync();
//    await client.Auth.SignInWithOtp(new SignInWithOtpOptions { Email = email, ShouldCreateUser = true });
// }

// public async Task<bool> IsLoggedInAsync()
// {
//    var client = await _provider.GetClientAsync();
//    return client.Auth.CurrentSession != null;
// }

// public async Task SignOutAsync()
// {
//    var client = await _provider.GetClientAsync();
//    await client.Auth.SignOut();
// }
//}

//public class SignInWithOtpOptions
//{
// public string Email { get; set; } = string.Empty;
// public bool ShouldCreateUser { get; set; } = false;
//}
