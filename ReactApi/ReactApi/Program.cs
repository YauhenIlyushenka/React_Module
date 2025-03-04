var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddWindowsService();

// Configuring location for frontend application
builder.Services.AddSpaStaticFiles(configuration =>
{
	configuration.RootPath = "ClientApp";
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseSpaStaticFiles(); // this middleware for handling frontend application's static compiled files
app.UseSpa(spa =>
{
	spa.Options.SourcePath = "ClientApp";
});
app.UseAuthorization();
app.MapControllers();

app.Run();
