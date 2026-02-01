using System;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers.Resources;

public class ContactResource
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; }
    
    [Required]
    [StringLength(10)]
    public string Phone { get; set; }
    
    [StringLength(255)]
    public string Email { get; set; }
}
