using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

public static class MongoDbConfig
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config.GetConnectionString("MongoDb");
        var databaseName = config["MongoDb:DatabaseName"];

        services.AddSingleton<IMongoClient>(_ => new MongoClient(connectionString));
        services.AddSingleton(serviceProvider =>
        {
            var client = serviceProvider.GetRequiredService<IMongoClient>();
            return client.GetDatabase(databaseName);
        });

        return services;
    }
}
