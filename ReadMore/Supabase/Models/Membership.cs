using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ReadMore.Supabase.Models;

[Table("memberships")]
public class Membership : BaseModel
{
 [PrimaryKey("user_id", false)]
 public Guid UserId { get; set; }
 [Column("club_id")]
 public Guid ClubId { get; set; }
 [Column("role")]
 public string Role { get; set; } = string.Empty;
 [Column("joined_at")]
 public DateTimeOffset? JoinedAt { get; set; }
}
