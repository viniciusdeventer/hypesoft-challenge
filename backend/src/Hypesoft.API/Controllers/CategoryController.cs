using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repository;

    public CategoryController(ICategoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _repository.GetAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var category = await _repository.GetByIdAsync(id);
        if (category == null)
            return NotFound();
        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Category category)
    {
        await _repository.AddAsync(category);
        return CreatedAtAction(nameof(GetById), new { id = category.IdCategory }, category);
    }

    //[HttpPut("{id}")]
    //public async Task<IActionResult> Update(string id, [FromBody] Category updatedCategory)
    //{
    //    var category = await _repository.GetByIdAsync(id);
    //    if (category == null)
    //        return NotFound();

    //    category.Name = updatedCategory.Name;

    //    await _repository.UpdateAsync(category);
    //    return NoContent();
    //}

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var category = await _repository.GetByIdAsync(id);
        if (category == null)
            return NotFound();

        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
