using System;
using System.Threading.Tasks;
using API.Controllers.Resources;
using API.Models;
using API.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("/api/vehicles")]
public class VehiclesController : ControllerBase
{
    private readonly IMapper _mapper;
        private readonly VegaDbContext _context;

    public VehiclesController(IMapper mapper, VegaDbContext context)
    {
        _context = context;
        _mapper = mapper;        
    }

    [HttpPost]
    public async Task<IActionResult> CreateVehicle([FromBody]VehicleResource vehicleResource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var model = await  _context.Models.FindAsync(vehicleResource.ModelId);
        if (model == null)
        {
            ModelState.AddModelError("modelId","Invalid modelId");
            return BadRequest(ModelState);
        }

        var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
        vehicle.LastUpdate = DateTime.UtcNow;
        
        _context.Vehicles.Add(vehicle);
        await _context.SaveChangesAsync();

        var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, [FromBody]VehicleResource vehicleResource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var vehicleInDb = await _context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);
        if (vehicleInDb == null)
            return NotFound();

        _mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicleInDb);
        vehicleInDb.LastUpdate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var result = _mapper.Map<Vehicle, VehicleResource>(vehicleInDb);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        var vehicleInDb = await _context.Vehicles.FindAsync(id);
        if (vehicleInDb == null)
            return NotFound();

        _context.Remove(vehicleInDb);
        await _context.SaveChangesAsync();

        return Ok(id);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVehicle(int id)
    {
        var vehicleInDb = await _context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);
        if (vehicleInDb == null)
            return NotFound();

        var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicleInDb);

        return Ok(vehicleResource);
    }

    [HttpGet]
    public async Task<IActionResult> GetVehicles()
    {
        var vehicles = await _context.Vehicles.Include(v => v.Features).ToListAsync();        

        var vehiclesResource = _mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles);

        return Ok(vehiclesResource);
    }
}
