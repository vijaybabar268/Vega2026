using API.Core;
using API.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class VehicleRepository : IVehicleRepository
{
    private readonly VegaDbContext _context;

    public VehicleRepository(VegaDbContext context)
    {
        _context = context;
    }

    public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
    {
        if (!includeRelated)
            return await _context.Vehicles.FindAsync(id);

        return await _context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make) 
            .SingleOrDefaultAsync(v => v.Id == id);
    }

    public async Task<IEnumerable<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj)
    {
        var query = _context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .AsQueryable();

        // Filter
        if (queryObj.MakeId.HasValue)
            query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

        if (queryObj.ModelId.HasValue)
            query = query.Where(m => m.ModelId == queryObj.ModelId.Value);

        // Sort
        if (queryObj.SortBy == "make") 
            query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);

        if (queryObj.SortBy == "model")
            query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);

        if (queryObj.SortBy == "contactName")
            query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);

        if (queryObj.SortBy == "id")
            query = (queryObj.IsSortAscending) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);

        return await query.ToListAsync();
    }

    public void Add(Vehicle vehicle)
    {
        _context.Vehicles.Add(vehicle);
    }

    public void Remove(Vehicle vehicle)
    {
        _context.Vehicles.Remove(vehicle);
    }
}
