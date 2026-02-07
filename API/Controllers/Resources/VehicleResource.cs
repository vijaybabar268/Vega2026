using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers.Resources;
 
public class VehicleResource
{
    public int Id { get; set; }

    public bool IsRegistered { get; set; }
    
    public ContactResource Contact { get; set; }
    
    public DateTime LastUpdate { get; set; }

    public KeyValuePairResource Model { get; set; }

    public KeyValuePairResource Make { get; set; }

    public ICollection<FeatureResource> Features { get; set; }

    public VehicleResource()
    {
        Features = new Collection<FeatureResource>();
    }
}
