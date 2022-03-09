using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    public class FileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public async Task<string> UploadFile(List<IFormFile> formFiles)
        {
            foreach (IFormFile formFile in formFiles)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload", formFile.FileName);

                await using var stream = System.IO.File.Create(path);
                await formFile.CopyToAsync(stream);
            }
            return "上传文件";
        }
    }
}
