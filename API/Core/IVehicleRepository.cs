using API.Core.Models;

namespace API.Core;

public interface IVehicleRepository
{
    Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);

    Task<IEnumerable<Vehicle>> GetVehiclesAsync();

    void Add(Vehicle vehicle);

    void Remove(Vehicle vehicle);
}
