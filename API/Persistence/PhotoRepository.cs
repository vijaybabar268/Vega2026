using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class PhotoRepository : IPhotoRepository
{
    private readonly VegaDbContext context;

    public PhotoRepository(VegaDbContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
    {
        return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
    }
}
