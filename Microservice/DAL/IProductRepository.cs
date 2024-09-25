using Microservice.Models;

namespace Microservice.DAL
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts();
        Product GetProductById(int id);
        Product AddProduct(Product product);    // Added for POST
        void UpdateProduct(Product product);    // Added for PUT
        void DeleteProduct(int id);             // Added for DELETE
    }
}
