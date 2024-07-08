using E_commerce.Models;

namespace E_commerce.Repository
{
    public interface ICartRepository : IRepository<Cart>
    {

        Task<Cart> GetCart();

    }
}
