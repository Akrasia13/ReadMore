//using Supabase.Postgrest;
//using ReadMore.Supabase.Models;

//namespace ReadMore.Supabase.Repositories;

//public interface IMembershipsRepository
//{
// Task<List<Membership>> ListForClubAsync(Guid clubId, CancellationToken ct = default);
// Task<List<Membership>> ListForUserAsync(Guid userId, CancellationToken ct = default);
// Task<Membership> InsertAsync(Membership membership, CancellationToken ct = default);
// Task DeleteAsync(Guid userId, Guid clubId, CancellationToken ct = default);
//}

//public class MembershipsRepository : IMembershipsRepository
//{
// private readonly ISupabaseClientProvider _provider;
// public MembershipsRepository(ISupabaseClientProvider provider) => _provider = provider;

// public async Task<List<Membership>> ListForClubAsync(Guid clubId, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var result = await client.From<Membership>().Filter("club_id", Postgrest.Constants.Operator.Equals, clubId).Get(ct: ct);
// return result.Models;
// }

// public async Task<List<Membership>> ListForUserAsync(Guid userId, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var result = await client.From<Membership>().Filter("user_id", Postgrest.Constants.Operator.Equals, userId).Get(ct: ct);
// return result.Models;
// }

// public async Task<Membership> InsertAsync(Membership membership, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var response = await client.From<Membership>().Insert(membership, ct: ct);
// return response.Models.Single();
// }

// public async Task DeleteAsync(Guid userId, Guid clubId, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// await client.From<Membership>()
// .Filter("user_id", Postgrest.Constants.Operator.Equals, userId)
// .Filter("club_id", Postgrest.Constants.Operator.Equals, clubId)
// .Delete(ct: ct);
// }
//}
