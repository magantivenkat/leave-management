using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveManagement.API.Data.Entities;

public class Holiday
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }          

    public DateTime Date { get; set; }
    public string Name { get; set; }
}
