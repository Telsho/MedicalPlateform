using Microsoft.AspNetCore.Identity;

namespace AuthJWT.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }
    }
}