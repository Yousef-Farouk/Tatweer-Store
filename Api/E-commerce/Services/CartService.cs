using AutoMapper;
using E_commerce.DTOS;
using E_commerce.Models;
using E_commerce.UnitOfWorks;

public class CartService 
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CartService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<CartDto> GetCart()
    {
        var cart = await _unitOfWork.CartRepository.GetCart();

        return _mapper.Map<CartDto>(cart);
    }

    public async Task AddItemToCart(CartItemDto cartItemDto)
    {
        var cart = await _unitOfWork.CartRepository.GetCart();
        if (cart == null)
        {
            cart = new Cart();
            await _unitOfWork.CartRepository.Add(cart);
            await _unitOfWork.SaveChanges();
        }
        var cartItem = cart.CartItems.FirstOrDefault(ct => ct.ProductId == cartItemDto.ProductId);

        if (cartItem == null)
        {
            cartItem = _mapper.Map<CartItem>(cartItemDto);

            cart.CartItems.Add(cartItem);
            await _unitOfWork.SaveChanges();

        }

        else
        {
            if(cartItem.Quantity > cartItemDto.Quantity) 
            {
                cartItem.Quantity -= 1;

            }
            else
            {
                cartItem.Quantity += 1;

            }
        }

        await _unitOfWork.CartRepository.Update(cart);

        await _unitOfWork.SaveChanges();  
    }

    public async Task RemoveItemFromCart(int productId)
    {
        var cart = await _unitOfWork.CartRepository.GetCart();

        if (cart == null)
        {
            throw new Exception("Cart not found");

        }

        var CartItem = cart.CartItems.FirstOrDefault(ct => ct.ProductId == productId);

        if (CartItem == null)
        {
            throw new Exception("Product not found in cart");
        }

        await _unitOfWork.CartItemRepository.Delete(CartItem);
        await _unitOfWork.CartRepository.Update(cart);
        await _unitOfWork.SaveChanges();
    }
   


}
