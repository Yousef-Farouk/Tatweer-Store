using AutoMapper;
using E_commerce.DTOS;
using E_commerce.Models;
using E_commerce.UnitOfWorks;

namespace E_commerce.Services
{
    public class ProductService 
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProducts()
        {
            var products = await _unitOfWork.ProductRepository.GetAll();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }


        public async Task<IEnumerable<ProductDto>> GetActiveProducts()
        {
            var products = await _unitOfWork.ProductRepository.GetVisibleProduct();

            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
        public async Task<ProductDto> GetProductById(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetById(id);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task AddProduct(ProductDto productDto)
        {
            var product = _mapper.Map<ProductDto, Product>(productDto);
            await _unitOfWork.ProductRepository.Add(product);
            await _unitOfWork.SaveChanges();
        }

        public async Task UpdateProduct(ProductDto productDto)
        {
          
            var product = await _unitOfWork.ProductRepository.GetById(productDto.Id);

            if (product == null) return;

            _mapper.Map(productDto, product); 

            _unitOfWork.ProductRepository.Update(product);
            await _unitOfWork.SaveChanges(); 
        }

        public async Task DeleteProduct(int id)
        {
             await _unitOfWork.ProductRepository.Delete(id);

             await _unitOfWork.SaveChanges();
        }
    }
}
