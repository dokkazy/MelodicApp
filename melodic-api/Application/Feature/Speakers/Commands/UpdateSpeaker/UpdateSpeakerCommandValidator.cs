using Application.Feature.Speakers.Commands.CreateSpeaker;
using FluentValidation;

namespace Application.Feature.Speakers.Commands.UpdateSpeaker
{
    public class UpdateSpeakerCommandValidator : AbstractValidator<UpdateSpeakerCommand>
    {
        public UpdateSpeakerCommandValidator()
        {
            // Validate Name
            RuleFor(p => p.Name)
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters.")
                .When(p => !string.IsNullOrEmpty(p.Name)); // Only validate if Name is provided

            //// Validate Price
            //RuleFor(p => p.Price)
            //    .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");


            //// Validate Description
            //RuleFor(p => p.Description) // Fixed typo here
            //    .NotEmpty().WithMessage("{PropertyName} is required.");


            //// Validate UnitInStock
            //RuleFor(p => p.UnitInStock)
            //    .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");
        }
    }
}
