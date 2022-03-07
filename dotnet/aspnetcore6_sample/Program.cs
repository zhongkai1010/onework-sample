using Tests;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication<ConfigurationAppModule>(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.Use(async (context, next) =>
{
    Console.WriteLine($"Use Thread:{Thread.GetCurrentProcessorId()}");

    WebRequstContext.Current = context;

    await next(context);
});

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();