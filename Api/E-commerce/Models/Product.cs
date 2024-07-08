using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int InStockQuantity { get; set; }

        public int Price { get; set; }

        public bool Visible { get; set; }

        public virtual List<CartItem>  CartItems {get;set;}

    }
}
