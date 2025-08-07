namespace Hypesoft.Domain.Entities;

public class Category
{
    public string IdCategory { get; private set; } = Guid.NewGuid().ToString();
    public string Name { get; private set; }

    public Category(string name)
    {
        Name = name;
    }

    public void UpdateName(string name)
    {
        Name = name;
    }
}
