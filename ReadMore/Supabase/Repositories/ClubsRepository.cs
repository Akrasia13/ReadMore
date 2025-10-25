//using Supabase.Postgrest;
//using ReadMore.Supabase.Models;

//namespace ReadMore.Supabase.Repositories;

//public interface IClubsRepository
//{
// Task<List<Club>> ListAsync(CancellationToken ct = default);
// Task<Club?> GetAsync(Guid id, CancellationToken ct = default);
// Task<Club> InsertAsync(Club club, CancellationToken ct = default);
// Task UpdateAsync(Club club, CancellationToken ct = default);
// Task DeleteAsync(Guid id, CancellationToken ct = default);
//}

//public class ClubsRepository : IClubsRepository
//{
// private readonly ISupabaseClientProvider _provider;
// public ClubsRepository(ISupabaseClientProvider provider) => _provider = provider;

// public async Task<List<Club>> ListAsync(CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var result = await client.From<Club>().Get(ct: ct);
// return result.Models;
// }

// public async Task<Club?> GetAsync(Guid id, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var result = await client.From<Club>().Filter("id", Constants.Operator.Equals, id).Get(ct: ct);
// return result.Models.FirstOrDefault();
// }

// public async Task<Club> InsertAsync(Club club, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// var response = await client.From<Club>().Insert(club, ct: ct);
// return response.Models.Single();
// }

// public async Task UpdateAsync(Club club, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// await client.From<Club>().Update(club, ct: ct);
// }

// public async Task DeleteAsync(Guid id, CancellationToken ct = default)
// {
// var client = await _provider.GetClientAsync();
// await client.From<Club>().Filter("id", Constants.Operator.Equals, id).Delete(ct: ct);
// }
//}
