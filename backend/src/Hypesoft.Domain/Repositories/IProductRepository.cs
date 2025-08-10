using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(string id);
    Task<Product?> GetByNameAsync(string name);
    Task<List<Product>> GetByCategoryIdAsync(string categoryId);
    Task<List<Product>> GetLowStockAsync(int threshold);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(string id);
}
