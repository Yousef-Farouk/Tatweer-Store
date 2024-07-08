using E_commerce.Models;
using E_commerce.Repository;

namespace E_commerce.Repository
{
    public interface IProductRepository : IRepository<Product>
    {
       Task<bool> DeleteProduct(int id);

        Task<IEnumerable<Product>> GetVisibleProduct();
    }
}
