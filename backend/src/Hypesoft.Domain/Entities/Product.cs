namespace Hypesoft.Domain.Entities;

public class Product
{
    public Guid IdProduct { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public string IdCategory { get; private set; }
    public int StockQuantity { get; private set; }

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

