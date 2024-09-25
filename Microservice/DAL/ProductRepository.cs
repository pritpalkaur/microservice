using Microservice.Models;

namespace Microservice.DAL
{
    public class ProductRepository : IProductRepository
    {
        private readonly List<Product> _products = new List<Product>
    {
        new Product { Id = 1, Name = "Product A", Price = 10.5m },
        new Product { Id = 2, Name = "Product B", Price = 20.99m }
    };

        public IEnumerable<Product> GetProducts() => _products;

        public Product GetProductById(int id) => _products.FirstOrDefault(p => p.Id == id);

        public Product AddProduct(Product product)
        {
            _products.Add(product);
            return product;
        }

        public void UpdateProduct(Product product)
        {
            var existingProduct = GetProductById(product.Id);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Price = product.Price;
            }
        }

        public void DeleteProduct(int id)
        {
            var product = GetProductById(id);
            if (product != null)
            {
                _products.Remove(product);
            }
        }
    }
}
