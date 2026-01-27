using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;

namespace API.Models;

public class Make
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    public ICollection<Model> Models { get; set; }

    public Make()
    {
        Models = new Collection<Model>();
    }
}
