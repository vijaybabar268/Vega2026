using System;
using System.Collections.ObjectModel;
using API.Models;

namespace API.Controllers.Resources;

public class MakeResource : KeyValuePairResource
{
    public ICollection<KeyValuePairResource> Models { get; set; }

    public MakeResource()
    {
        Models = new Collection<KeyValuePairResource>();
    }
}
