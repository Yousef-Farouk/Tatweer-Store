using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using E_commerce.Models;
using E_commerce.UnitOfWorks;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace E_commerce.Repository
{
    public class ProductRepository : Repository<Product>,IProductRepository
    {

        public ProductRepository(EcommerceContext db) : base(db) 
        {
         
            

        }
        public async Task<bool> DeleteProduct(int id)
        {
            var product = await  db.Products.FirstOrDefaultAsync(p=> p.Id == id );
            if (product == null) 
            {
                return false;
            }
            product.Visible = false;

            return true;
        }

        public async Task<IEnumerable<Product>> GetVisibleProduct()
        {
            return await db.Products.Where(p => p.Visible).ToListAsync();
        }
    }
}
