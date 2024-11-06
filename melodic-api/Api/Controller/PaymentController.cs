using Application.Feature.Order.Event;
using Application.Identity;
using Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Net.payOS;
using Net.payOS.Types;

namespace Api.Controller;

[Route("[controller]")]
[ApiController]
public class PaymentController(
    PayOS payOs,
    MelodicDbContext context,
    IUserService userService,
    IPublisher publisher,
    IEmailSender emailSender) : ControllerBase
{
    [HttpPost("callback")]
    public async Task<IActionResult> PayOsTransferHandler(WebhookType body)
    {
        try
        {
            _ = payOs.verifyPaymentWebhookData(body);
        }
        catch (Exception)
        {
            return NoContent();
        }

        if (body.success)
        {
            var order = await context.Orders.FirstOrDefaultAsync(x => x.OrderCode == body.data.orderCode);
            if (order is not null)
            {
                var user = await userService.GetUser(order.UserId);
                order.SetPaidStatus();
                var orderPaid = new OrderPaidEvent(order.UserId, order.OrderItems.ToList());
                await publisher.Publish(orderPaid);
                context.Orders.Update(order);
                await emailSender.SendEmailAsync(user.Email, "Melodic thank for purchased",
                    $"Order {order.OrderCode} have been purchased.");
                await context.SaveChangesAsync();
            }
        }

        return Ok();
    }
}