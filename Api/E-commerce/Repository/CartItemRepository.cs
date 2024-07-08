using E_commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Repository
{
    public class CartItemRepository : Repository<CartItem>, ICartItemRepository
    {

        public CartItemRepository(EcommerceContext _db) : base(_db)
        {


        }

        public async Task<CartItem> GetCartItemByIdAsync(int id)
        {
            return await db.CartItems.FindAsync(id);
        }

        public async Task<bool> DeleteCartItemAsync(int id)
        {
            var cartItem = await db.CartItems.FindAsync(id);
            if (cartItem == null) return false;

            db.CartItems.Remove(cartItem);
            return true;
        }


    }
}
