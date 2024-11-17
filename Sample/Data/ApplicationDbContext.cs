using Microsoft.EntityFrameworkCore;
using Sample.Models;

namespace Sample.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Login> Login { get; set; }
        public DbSet<OverallModel> OverallModel { get; set; }
    }
}
