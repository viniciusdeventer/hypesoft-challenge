using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Configurations
{
    public static class MongoDbConfig
    {
        public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING")
                                   ?? config.GetConnectionString("MongoDb");

            var databaseName = Environment.GetEnvironmentVariable("MONGO_DBNAME")
                               ?? config["MongoDb:DatabaseName"];

            services.AddSingleton<IMongoClient>(_ => new MongoClient(connectionString));
            services.AddSingleton(serviceProvider =>
            {
                var client = serviceProvider.GetRequiredService<IMongoClient>();
                return client.GetDatabase(databaseName);
            });

            return services;
        }
    }
}