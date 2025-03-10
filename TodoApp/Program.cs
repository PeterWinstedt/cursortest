using TodoApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();

// Register TaskService with IWebHostEnvironment dependency
builder.Services.AddSingleton<TaskService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Set up URL and port configuration
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors();

// Configure static files - important for serving the frontend
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();

// Print the URLs being used for debugging
var urls = app.Urls.ToList();
Console.WriteLine("Application listening on:");
foreach (var url in urls)
{
    Console.WriteLine($"  {url}");
}

app.Run();
