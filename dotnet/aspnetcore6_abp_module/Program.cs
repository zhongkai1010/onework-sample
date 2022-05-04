using Tests;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication<ApplicationBootModule>();

WebApplication app = builder.Build();

 

app.InitializeApplication();

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
