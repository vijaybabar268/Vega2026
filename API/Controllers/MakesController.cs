using System;
using System.Threading.Tasks;
using API.Models;
using API.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Controllers.Resources;
namespace API.Controllers;

public class MakesController : ControllerBase
{
    private readonly VegaDbContext _context;
    private readonly IMapper _mapper;

    public MakesController(VegaDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    [HttpGet("/api/makes")]
    public async Task<IEnumerable<MakeResource>> GetMakes()
    {
        var makes = await _context.Makes.Include(m => m.Models).ToListAsync();

        return _mapper.Map<List<Make>, List<MakeResource>>(makes);
    }
}
