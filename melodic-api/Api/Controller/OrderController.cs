using Application.Feature.Order.Commands;
using Application.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Identity.Models;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Net.payOS;
using Net.payOS.Types;

namespace Api.Controller;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrderController(
    MelodicDbContext context,
    IMediator mediator,
    PayOS payOs,
    IHttpContextAccessor httpContextAccessor,
    IUserService userService) : ControllerBase
{
    // GET: api/Order
    [HttpGet]
    [Authorize(Roles = ApplicationRole.Role_Admin)]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var orders = await context.Orders.Include(x => x.Address).ToListAsync();
        var orderResponses = orders.Select(x => new OrderResponse()
        {
            Id = x.Id,
            OrderDate = x.OrderDate,
            OrderStatus = x.OrderStatus,
            OrderCode = x.OrderCode,
            PaymentId = x.PaymentId,
            ZipCode = x.Address.ZipCode,
            Country = x.Address.Country,
            State = x.Address.State,
            Street = x.Address.Street,
            City = x.Address.City,
            PhoneNumber = x.PhoneNumber
        }).ToList();

        return Ok(orderResponses);
    }

    // GET: api/Order/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(Guid id)
    {
        var order = await context.Orders.Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.Id == id && x.UserId == userService.UserId);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    // POST: api/Order
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult> Checkout([FromBody] PlaceOrderCommand request)
    {
        request.UserId = userService.UserId;
        var order = await mediator.Send(request);

        if (order.OrderStatus == OrderStatus.Cancelled)
        {
            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        var totalPrice = 0;
        var items = new List<ItemData>();
        foreach (var item in order.OrderItems)
        {
            items.Add(new ItemData(item.SpeakerName, item.Units, (int)item.UnitPrice));
            totalPrice += item.Units * (int)item.UnitPrice;
        }

        // Get the current request's base URL
        var requestUri = httpContextAccessor.HttpContext?.Request;
        var baseUrl = $"{requestUri?.Scheme}://{requestUri?.Host}";

        var paymentData = new PaymentData(
            order.OrderCode,
            totalPrice,
            $"Purchase Melodic",
            items,
            $"{baseUrl}/cancel/{order.OrderCode}",
            $"{baseUrl}/success"
        );

        var createPayment = await payOs.createPaymentLink(paymentData);


        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, createPayment);
    }

    // PUT: api/Order/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PurchaseCancel(int orderCode)
    {
        var order = await context.Orders
            .FirstOrDefaultAsync(x => x.OrderCode == orderCode && x.UserId == userService.UserId);

        if (order is not null)
        {
            order.SetCancelledStatus();
            context.Entry(order).State = EntityState.Modified;
        }

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return NotFound();
        }

        return NoContent();
    }
}

public class OrderResponse
{
    public Guid Id { get; set; }
    public int OrderCode { get; set; }
    public string UserId { get; }
    public DateTime OrderDate { get; set; }
    public double? Tax { get; private set; }

    public string Description { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public string PaymentId { get; set; }

    public string City { get; set; }

    public string Street { get; set; }

    public string State { get; set; }

    public string Country { get; set; }
    public string ZipCode { get; set; }

    public string PhoneNumber { get; set; }
}

public class OrderItemResponse
{
    public string SpeakerName { get; set; }
    public Guid SpeakerId { get; set; }
    public int Units { get; set; }
    public double UnitPrice { get; set; }
}