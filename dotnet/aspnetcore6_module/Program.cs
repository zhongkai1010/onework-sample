using Tests;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication<ApplicationBootModule>();

var app = builder.Build();

builder.WebHost.Configure(applicationBuilder => applicationBuilder.InitializeApplication());

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
