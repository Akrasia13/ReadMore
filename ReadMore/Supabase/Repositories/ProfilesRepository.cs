//using Supabase.Postgrest;
//using ReadMore.Supabase.Models;

//namespace ReadMore.Supabase.Repositories;

//public interface IProfilesRepository
//{
// Task<Profile?> GetAsync(Guid userId, CancellationToken ct = default);
// Task<Profile> UpsertAsync(Profile profile, CancellationToken ct = default);
//}

//public class ProfilesRepository : IProfilesRepository
//{
// private readonly ISupabaseClientProvider _provider;
// public ProfilesRepository(ISupabaseClientProvider provider) => _provider = provider;

// public async Task<Profile?> GetAsync(Guid userId, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var result = await client.From<Profile>().Filter("user_id", Postgrest.Constants.Operator.Equals, userId).Get(ct: ct);
// return result.Models.FirstOrDefault();
// }

// public async Task<Profile> UpsertAsync(Profile profile, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var response = await client.From<Profile>().Upsert(profile, onConflict: "user_id", ct: ct);
// return response.Models.Single();
// }
//}
