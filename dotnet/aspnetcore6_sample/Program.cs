using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.FileProviders;
using Tests;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication<ConfigurationAppModule>(builder.Configuration);

builder.Services.AddWebOptimizer(pipeline =>
{
    PhysicalFileProvider physicalFileProvider =
        new PhysicalFileProvider(Path.Combine(AppContext.BaseDirectory, "Assets"));
    
    pipeline.AddCssBundle("/css/bundle.css", "css/a.css","css/b.css").UseContentRoot();
    pipeline.AddJavaScriptBundle("/Assets/j.js", "j1.js", "j2.js").UseFileProvider(physicalFileProvider);
    
});


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

    //if (context.Request.Path == "/")
    //{
    //    context.Response.Redirect("http://www.baidu.com");
    //}

    await next(context);
});

app.UseWebOptimizer();

app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(AppContext.BaseDirectory,"Assets")),
    RequestPath = "/Assets"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(AppContext.BaseDirectory,"webapp")),
    RequestPath = "/webapp"
});


app.UseRouting();

//app.UseAuthentication();

//app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();