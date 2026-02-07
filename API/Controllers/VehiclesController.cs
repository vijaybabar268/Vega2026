using API.Controllers.Resources;
using API.Core;
using API.Core.Models;
using API.Croe;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("/api/vehicles")]
public class VehiclesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IVehicleRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
        vehicle.LastUpdate = DateTime.UtcNow;
        
        _repository.Add(vehicle);
        await _unitOfWork.CompleteAsync();

        vehicle = await _repository.GetVehicleAsync(vehicle.Id);

        var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody]SaveVehicleResource saveVehicleResource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var vehicleInDb = await _repository.GetVehicleAsync(id);
        if (vehicleInDb == null)
            return NotFound();

        _mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource, vehicleInDb);
        vehicleInDb.LastUpdate = DateTime.UtcNow;

        await _unitOfWork.CompleteAsync();

        vehicleInDb = await _repository.GetVehicleAsync(vehicleInDb.Id);
        var result = _mapper.Map<Vehicle, VehicleResource>(vehicleInDb);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        var vehicleInDb = await _repository.GetVehicleAsync(id, includeRelated: false);
        if (vehicleInDb == null)
            return NotFound();

        _repository.Remove(vehicleInDb);
        await _unitOfWork.CompleteAsync();

        return Ok(id);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVehicle(int id)
    {
        var vehicleInDb = await _repository.GetVehicleAsync(id);
        if (vehicleInDb == null)
            return NotFound();

        var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicleInDb);

        return Ok(vehicleResource);
    }

    [HttpGet]
    public async Task<IActionResult> GetVehicles()
    {
        var vehicles = await _repository.GetVehiclesAsync();

        var vehiclesResource = _mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles);

        return Ok(vehiclesResource);
    }
}
