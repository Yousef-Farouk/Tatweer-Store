using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Models
{
    public class EcommerceContext : DbContext 
    {

        public DbSet<CartItem>? CartItems { get; set; }

        public DbSet<Cart>? Carts { get; set; }

        public DbSet<Product>? Products { get; set;}

        public EcommerceContext() :base() {}

        public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
