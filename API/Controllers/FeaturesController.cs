using System;
using API.Controllers.Resources;
using API.Models;
using API.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class FeaturesController : ControllerBase
{
    private readonly VegaDbContext _context;
    private readonly IMapper _mapper;

    public FeaturesController(VegaDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<FeatureResource>> GetFeatures()
    {
        var features = await _context.Features.ToListAsync();

        return _mapper.Map<IEnumerable<Feature>, IEnumerable<FeatureResource>>(features);
    }
}
