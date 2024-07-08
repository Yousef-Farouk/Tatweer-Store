using E_commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Repository
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {

        public CartRepository(EcommerceContext _db) : base(_db)
        {


        }

       
        public async  Task<Cart> GetCart()
        {
            return await db.Carts.FirstOrDefaultAsync();
        }

       


    }
}
