using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repository;

    public ProductController(IProductRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _repository.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
            return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        await _repository.AddAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = product.IdProduct }, product);
    }

    //[HttpPut("{id:guid}")]
    //public async Task<IActionResult> Update(Guid id, [FromBody] Product updatedProduct)
    //{
    //    var product = await _repository.GetByIdAsync(id);
    //    if (product == null)
    //        return NotFound();

    //    // Atualizar os campos manualmente para evitar alterar o IdProduct
    //    product.Name = updatedProduct.Name;
    //    product.Description = updatedProduct.Description;
    //    product.Price = updatedProduct.Price;
    //    product.IdCategory = updatedProduct.IdCategory;
    //    product.StockQuantity = updatedProduct.StockQuantity;

    //    await _repository.UpdateAsync(product);
    //    return NoContent();
    //}

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
            return NotFound();

        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
