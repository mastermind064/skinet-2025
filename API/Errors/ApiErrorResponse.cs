using System.Runtime.InteropServices;

namespace API.Errors;

public class ApiErrorResponse(int statusCode, string message, string? details)
{
    public int StatusCode { get; set; } = statusCode;
    public String Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
