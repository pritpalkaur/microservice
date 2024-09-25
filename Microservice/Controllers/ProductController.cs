using Microservice.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microservice.Models;  // Assuming you have a Product model here

namespace Microservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: /Product
        [HttpGet(Name = "GetAllProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _productRepository.GetProducts();
            return Ok(products);
        }

        // GET: /Product/{id}
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        // POST: /Product
        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            if (product == null || !ModelState.IsValid)
                return BadRequest("Invalid product data.");

            var createdProduct = _productRepository.AddProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
        }

        // PUT: /Product/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            if (product == null || id != product.Id || !ModelState.IsValid)
                return BadRequest("Invalid product data.");

            var existingProduct = _productRepository.GetProductById(id);
            if (existingProduct == null)
                return NotFound();

            _productRepository.UpdateProduct(product);
            return NoContent();  // 204 No Content
        }

        // DELETE: /Product/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
                return NotFound();

            _productRepository.DeleteProduct(id);
            return NoContent();  // 204 No Content
        }
    }
}
