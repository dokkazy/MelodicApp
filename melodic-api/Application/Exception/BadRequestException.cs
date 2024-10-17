using FluentValidation.Results;

namespace Application.Exception;

public class BadRequestException : System.Exception
{
    public BadRequestException(string message) : base(message){}

    public BadRequestException(string message, ValidationResult validationResult) : base(message)
    {
        ValidationErrors = validationResult.ToDictionary();
    }

    public IDictionary<string,string[]> ValidationErrors { get; set; }
}