using Application.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Database;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controller;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class BasketController(MelodicDbContext context, IUserService userService) : ControllerBase
{
    // GET: api/Basket
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Basket>>> GetBaskets()
    {
        var basket = await context.Baskets.Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.UserId == userService.UserId);

        var result = new List<BasketItemResponse>();
        if (basket is not null)
        {
            var basketsItem = basket.Items;
            var speakerIds = basketsItem.Select(x => x.SpeakerId);
            var speakers = await context.Speakers.Where(x => speakerIds.Contains(x.Id)).ToListAsync();

            result = (from item in basketsItem
                join speaker in speakers on item.SpeakerId equals speaker.Id
                select new BasketItemResponse(speaker.Id.ToString(), speaker.MainImg, item.Quantity,
                    item.Quantity < speaker.UnitInStock, speaker.Price, speaker.Price)).ToList();
        }

        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> PutBasket(BasketRequest request)
    {
        var basket = await context.Baskets.Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.UserId == userService.UserId);

        var speakerIds = request.Items.Select(x => x.SpeakerId).ToList();
        var speakers = await context.Speakers.Where(x => speakerIds.Contains(x.Id)).ToListAsync();
        var speakerDict = speakers.ToDictionary(x => x.Id, x => x);
        var confirmedOrderStockItems = new List<BasketConfirmedItem>();

        foreach (var item in request.Items)
        {
            var speaker = speakerDict[item.SpeakerId];
            var hasStock = speaker.UnitInStock >= item.Quantity;
            var confirmedBasketItem = new BasketConfirmedItem(speaker.Id, hasStock);
            confirmedOrderStockItems.Add(confirmedBasketItem);
        }

        if (confirmedOrderStockItems.Any(x => !x.HasStock))
        {
            return BadRequest(confirmedOrderStockItems);
        }

        if (basket is not null)
        {
            foreach (var item in request.Items)
            {
                basket.AddItem(item.SpeakerId, item.Quantity);
            }

            context.Entry(basket).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        return NoContent();
    }

    // DELETE: api/Basket/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSpeaker(Guid id)
    {
        var basket = await context.Baskets.Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.UserId == userService.UserId);
        if (basket == null)
        {
            return NotFound();
        }

        basket.DeleteItem(id);
        context.Entry(basket).State = EntityState.Modified;
        context.Baskets.Update(basket);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteBasket()
    {
        var basket = await context.Baskets.Include(x => x.Items)
            .SingleOrDefaultAsync(x => x.UserId == userService.UserId);
        if (basket == null)
        {
            return NotFound();
        }

        basket.EmptyBasket();
        context.Baskets.Update(basket);
        await context.SaveChangesAsync();

        return NoContent();
    }

    private record BasketItemResponse(
        string SpeakerId,
        string Url,
        int Quantity,
        bool IsAvailable = false,
        double UnitPrice = 0,
        double OldUnitPrice = 0);

    public record BasketItemRequest(Guid SpeakerId, int Quantity);

    private record BasketConfirmedItem(Guid SpeakerId, bool HasStock);

    public record BasketRequest(List<BasketItemRequest> Items);
}