string myPolicy = "MyPolicy";

var builder = WebApplication.CreateBuilder(args);

// Configure Cors
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: myPolicy, corsBuilder =>
	{
		corsBuilder.WithOrigins(builder.Configuration.GetSection("CORS:Origins").Get<string[]>()!)
			.WithHeaders(builder.Configuration.GetSection("CORS:Headers").Get<string[]>()!)
			.WithMethods(builder.Configuration.GetSection("CORS:Methods").Get<string[]>()!);
	});
});


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

//app.UseHttpsRedirection();

app.UseSpaStaticFiles(); // this middleware for handling frontend application's static compiled files

app.UseCors(myPolicy); // enable CORS
app.UseSpa(spa =>
{
	spa.Options.SourcePath = "ClientApp";
});
app.UseAuthorization();
app.MapControllers();

app.Run();
