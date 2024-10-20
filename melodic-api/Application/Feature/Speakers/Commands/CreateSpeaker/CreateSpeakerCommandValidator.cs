using FluentValidation;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Speakers.Commands.CreateSpeaker
{
    public class CreateSpeakerCommandValidator : AbstractValidator<CreateSpeakerCommand>
    {
        public CreateSpeakerCommandValidator()
        {
            // Validate Name
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(100).WithMessage("{PropertyName} must not exceed 100 characters.");

            // Validate Price
            RuleFor(p => p.Price)
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");

            // Validate Description
            RuleFor(p => p.Decription)
                .NotEmpty().WithMessage("{PropertyName} is required.");

            // Validate UnitInStock
            RuleFor(p => p.UnitInStock)
                .NotNull().WithMessage("{PropertyName} is required.")
                .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");
        }
    }
}
