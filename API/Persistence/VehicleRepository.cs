using System;
using System.Linq.Expressions;
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
        var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
        {
            ["make"] = v => v.Model.Make.Name,
            ["model"] = v => v.Model.Name,  
            ["contactName"] = v => v.ContactName,
            ["id"] = v => v.Id
        };

        query = ApplyOrdering(queryObj, query, columnsMap);
 
        return await query.ToListAsync();
    }

    private IQueryable<Vehicle> ApplyOrdering(VehicleQuery queryObj, IQueryable<Vehicle> query, 
        Dictionary<string, Expression<Func<Vehicle, object>>> columnsMap)
    {
        if (queryObj.IsSortAscending)
            return query.OrderBy(columnsMap[queryObj.SortBy]);
        else
            return query.OrderByDescending(columnsMap[queryObj.SortBy]);
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
