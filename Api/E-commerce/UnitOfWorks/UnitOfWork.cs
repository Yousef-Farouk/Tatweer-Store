using AutoMapper;
using CloudinaryDotNet;
using E_commerce.Models;
using E_commerce.Repository;

namespace E_commerce.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        EcommerceContext db;
        IProductRepository productRepository;
        ICartRepository cartRepository;
        ICartItemRepository cartItemRepository;
        IMapper mapper;

        public UnitOfWork(EcommerceContext _db,IMapper _mapper)
        {
            db = _db;
           
            mapper = _mapper;
        }


        public IProductRepository ProductRepository 
        { 
            get { 
                if (productRepository == null)
                {
                     productRepository = new ProductRepository(db); 

                }
                return productRepository;
            } 
        }

        public ICartRepository CartRepository
        {
            get
            {
                if (cartRepository == null)
                {
                    cartRepository = new CartRepository(db);
                }

                return cartRepository;
            }

        }

        public ICartItemRepository CartItemRepository
        {
            get
            {
                if (cartItemRepository == null)
                {
                    cartItemRepository = new CartItemRepository(db);
                }

                return cartItemRepository;
            }

        }

        public async Task SaveChanges()
        {
           await  db.SaveChangesAsync();
        }
    }
}
