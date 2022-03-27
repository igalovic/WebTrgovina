
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options) //add options with base to parent class
        {
        }
        public DbSet<Product> Products { get; set; } //allow us to acces products and use methods inside dbcontext to find entity with id or get list of all products, query data and retrieve the data that looking for from database

    }
}