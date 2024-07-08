using E_commerce.Models;
using System.ComponentModel.DataAnnotations;

namespace E_commerce.DTOS
{
    public class ProductDto
    {
       
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public int InStockQuantity { get; set; }

        public bool Visible { get; set; }
    }
}
