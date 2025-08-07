using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly IMongoCollection<Product> _collection;

    public ProductRepository(IMongoDatabase database)
    {
        _collection = database.GetCollection<Product>("Products");
    }

    public async Task AddAsync(Product product) =>
        await _collection.InsertOneAsync(product);

    public async Task DeleteAsync(Guid id) =>
        await _collection.DeleteOneAsync(p => p.IdProduct == id);

    public async Task<List<Product>> GetAllAsync() =>
        await _collection.Find(_ => true).ToListAsync();

    public async Task<Product?> GetByIdAsync(Guid id) =>
        await _collection.Find(p => p.IdProduct == id).FirstOrDefaultAsync();

    public async Task<Product?> GetByNameAsync(string name) =>
        await _collection.Find(p => p.Name.ToLower() == name.ToLower()).FirstOrDefaultAsync();

    public async Task<List<Product>> GetByCategoryIdAsync(string categoryId) =>
        await _collection.Find(p => p.IdCategory == categoryId).ToListAsync();

    public async Task<List<Product>> GetLowStockAsync(int threshold) =>
        await _collection.Find(p => p.StockQuantity < threshold).ToListAsync();

    public async Task UpdateAsync(Product product) =>
        await _collection.ReplaceOneAsync(p => p.IdProduct == product.IdProduct, product);
}
