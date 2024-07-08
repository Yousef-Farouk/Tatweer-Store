using E_commerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.DTOS
{
    public class CartDto
    {

        public int Id { get; set; }

        public string SessionId { get; set; }

        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();

        public decimal TotalAmount => CartItems.Sum(item => item.Product.Price * item.Quantity);
       
    }
}
