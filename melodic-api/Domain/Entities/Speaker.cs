﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Entities;

public class Speaker : AuditableEntity
{
    // public Guid Id { get; set; }
    [Required]
    public string? Name { get; set; }

    [ForeignKey("Brand")]
    public Guid BrandId { get; set; }

    // [ValidateNever]
    public Brand? Brand { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than 0")]
    public double Price { get; set; }

    [Required]
    public string? Decription { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Please enter a value bigger than 0")]
    public int UnitInStock { get; set; }

    // [ValidateNever]
    public string? MainImg { get; set; }
    public string? Img1 { get; set; }
    public string? Img2 { get; set; }
    public string? Img3 { get; set; }
    public string? Img4 { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new();
    
    
    public int RemoveStock(int quantityDesired)
    {
        if (UnitInStock == 0)
        {
            throw new AggregateException($"Empty stock, product item {Name} is sold out");
        }

        if (quantityDesired <= 0)
        {
            throw new AggregateException($"Item units desired should be greater than zero");
        }

        int removed = Math.Min(quantityDesired, this.UnitInStock);

        this.UnitInStock -= removed;

        return removed;
    }
}
