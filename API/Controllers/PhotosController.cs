using System;
using System.Threading.Tasks;
using API.Controllers.Resources;
using API.Core;
using API.Core.Models;
using API.Croe;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers;

[Route("/api/vehicles/{vehicleId}/photos")]
public class PhotosController : ControllerBase
{
    private readonly IHostEnvironment host;
    private readonly IVehicleRepository repository;
    private readonly IUnitOfWork unitOfWork;
    private readonly IMapper mapper;
    private readonly PhotoSettings photoSettings;

    public PhotosController(IHostEnvironment host, IVehicleRepository repository, 
        IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
    {
        this.photoSettings = options.Value;
        this.unitOfWork = unitOfWork;
        this.mapper = mapper;
        this.repository = repository;
        this.host = host;
    }

    [HttpPost]
    public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
    {
        var vehicle = await repository.GetVehicleAsync(vehicleId, includeRelated: false);
        if (vehicle == null)
            return NotFound();

        if (file == null) return BadRequest("Null file");
        if (file.Length == 0)  return BadRequest("Empty file");
        if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
        if(!photoSettings.IsSupported(file.FileName))
            return BadRequest("Invalid file type");

        var uploadFolderPath = Path.Combine(host.ContentRootPath, "uploads");
        if (!Directory.Exists(uploadFolderPath))
            Directory.CreateDirectory(uploadFolderPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadFolderPath, fileName);

        using(var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var photo = new Photo { FileName = fileName };
        vehicle.Photos.Add(photo);

        await unitOfWork.CompleteAsync();

        return Ok(mapper.Map<Photo, PhotoResource>(photo));
    }
}
