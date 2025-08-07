using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços MVC (Controllers)
builder.Services.AddControllers();

// MongoDB
builder.Services.AddMongoDb(builder.Configuration);
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

var app = builder.Build();

app.UseHttpsRedirection();

// Mapear controllers
app.MapControllers();

app.Run();
