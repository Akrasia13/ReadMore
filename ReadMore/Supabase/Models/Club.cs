using Supabase;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ReadMore.Supabase.Models;

[Table("clubs")]
public class Club : BaseModel
{
 [PrimaryKey("id", false)]
 public Guid Id { get; set; }
 [Column("name")]
 public string Name { get; set; } = string.Empty;
 [Column("slug")]
 public string Slug { get; set; } = string.Empty;
 [Column("created_at")]
 public DateTimeOffset? CreatedAt { get; set; }
 [Column("owner_user_id")]
 public Guid OwnerUserId { get; set; }
}
