using Microsoft.EntityFrameworkCore;
using MovieFinderAPI.Models;

namespace MovieFinderAPI.DBAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<UserSwipe> UserSwipes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().Property(m => m.TmdbId).ValueGeneratedNever();
        }
    }
}
