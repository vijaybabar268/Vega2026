using API.Core.Models;

namespace API.Core;

public interface IVehicleRepository
{
    Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

    Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj);

    void Add(Vehicle vehicle);

    void Remove(Vehicle vehicle);
}