using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Hypesoft.Domain.Entities;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? IdProduct { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public string IdCategory { get; set; }
    public int StockQuantity { get; set; }

    public Product() { }

    public Product(string name, string description, decimal price, string idCategory, int stockQuantity)
    {
        Name = name;
        Description = description;
        Price = price;
        IdCategory = idCategory;
        StockQuantity = stockQuantity;
    }

    public void Update(string name, string description, decimal price, string idCategory)
    {
        Name = name;
        Description = description;
        Price = price;
        IdCategory = idCategory;
    }

    public void SetStockQuantity(int quantity)
    {
        StockQuantity = quantity;
    }
}
