using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly IMongoCollection<Category> _collection;

    public CategoryRepository(IMongoDatabase database)
    {
        _collection = database.GetCollection<Category>("Categories");
    }

    public async Task AddAsync(Category category, CancellationToken cancellationToken = default) =>
        await _collection.InsertOneAsync(category, null, cancellationToken);

    public async Task DeleteAsync(string id, CancellationToken cancellationToken = default) =>
        await _collection.DeleteOneAsync(c => c.IdCategory == id, cancellationToken);

    public async Task<List<Category>> GetAllAsync(CancellationToken cancellationToken = default) =>
        await _collection.Find(_ => true).ToListAsync(cancellationToken);

    public async Task<Category?> GetByIdAsync(string id, CancellationToken cancellationToken = default) =>
        await _collection.Find(c => c.IdCategory == id).FirstOrDefaultAsync(cancellationToken);

    public async Task<Category?> GetByNameAsync(string name, CancellationToken cancellationToken = default)
    {
        var filter = Builders<Category>.Filter.Regex(c => c.Name, new MongoDB.Bson.BsonRegularExpression($"^{name}$", "i"));
        return await _collection.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task UpdateAsync(Category category, CancellationToken cancellationToken = default) =>
        await _collection.ReplaceOneAsync(c => c.IdCategory == category.IdCategory, category, cancellationToken: cancellationToken);
}
