using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ReadMore.Supabase.Models;

[Table("profiles")]
public class Profile : BaseModel
{
 [PrimaryKey("user_id", false)]
 public Guid UserId { get; set; }
 [Column("display_name")]
 public string? DisplayName { get; set; }
 [Column("avatar_url")]
 public string? AvatarUrl { get; set; }
 [Column("created_at")]
 public DateTimeOffset? CreatedAt { get; set; }
}
