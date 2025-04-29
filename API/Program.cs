using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//pasang disini interface dan implementation dari productrepository
builder.Services.AddScoped<IProductRepository, ProductRepository>();

//pasang disini interface dan implementation dari generic repository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

//diatas baris ini disebut service. swagger nda dipake, jadi dihapus aja
var app = builder.Build();
// dibawah ini disebut middleware. yang dipake cuman MapControllers dan Run

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.MapControllers();

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
}
catch (System.Exception ex)
{
    Console.WriteLine(ex);
    throw;
}

app.Run();
