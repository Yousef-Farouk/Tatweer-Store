using E_commerce.Models;

namespace E_commerce.Repository
{
    public interface ICartItemRepository : IRepository<CartItem>
    {
        //Task<IEnumerable<CartItem>> GetCartItemsBySessionIdAsync(string sessionId);

        Task<CartItem> GetCartItemByIdAsync(int id);

        Task<bool> DeleteCartItemAsync(int id);

    }
}
