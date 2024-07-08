using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public decimal TotalAmount => CartItems.Sum(item => item.Product.Price * item.Quantity);

        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
            
    }
}
