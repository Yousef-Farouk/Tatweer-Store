using AutoMapper;
using E_commerce.Repository;

namespace E_commerce.UnitOfWorks
{
    public interface IUnitOfWork
    {
       public IProductRepository ProductRepository { get; }
       public ICartRepository CartRepository { get; }
       public ICartItemRepository CartItemRepository { get; }
       public Task SaveChanges();
    }
}