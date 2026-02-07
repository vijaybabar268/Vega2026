using System;
using API.Models;

namespace API.Persistence;

public interface IVehicleRepository
{
    Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

    Task<IEnumerable<Vehicle>> GetVehiclesAsync();

    void Add(Vehicle vehicle);

    void Remove(Vehicle vehicle);
}
