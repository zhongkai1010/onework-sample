using Microsoft.AspNetCore.Mvc;

namespace aspnet6_view_sample.ViewComponents;

public class PriorityListViewComponent : ViewComponent
{
    public Task<IViewComponentResult> InvokeAsync(dynamic data)
    {
        return Task.FromResult<IViewComponentResult>(View(data));
    }

    public Task<IViewComponentResult> Test()
    {
        return Task.FromResult<IViewComponentResult>(View());
    }
}