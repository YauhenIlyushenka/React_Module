using Hangfire;
using Hangfire.Storage.SQLite;
using ReactApi.Services;
using ReactApi.Services.SignalR;

string myPolicy = "MyPolicy";

var builder = WebApplication.CreateBuilder(args);

// Configure Cors
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: myPolicy, corsBuilder =>
	{
		corsBuilder.WithOrigins(builder.Configuration.GetSection("CORS:Origins").Get<string[]>()!)
			.WithHeaders(builder.Configuration.GetSection("CORS:Headers").Get<string[]>()!)
			.WithMethods(builder.Configuration.GetSection("CORS:Methods").Get<string[]>()!)
			.AllowCredentials();
	});
});

builder.Services.AddHangfire(configuration => configuration
	.UseSimpleAssemblyNameTypeSerializer()
	.UseRecommendedSerializerSettings()
	.UseSQLiteStorage(builder.Configuration.GetConnectionString("HangfireConnection")));

builder.Services.AddHangfireServer();
builder.Services.AddSignalR(o =>
{
	o.EnableDetailedErrors = true;
});

builder.Services.AddControllers();
builder.Services.AddWindowsService();
builder.Services.AddScoped<IJobRunService, JobRunService>();

// Configuring location for frontend application
builder.Services.AddSpaStaticFiles(configuration =>
{
	configuration.RootPath = "ClientApp";
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseSpaStaticFiles(); // this middleware for handling frontend application's static compiled files

app.UseCors(myPolicy); // enable CORS
app.UseHangfireDashboard(pathMatch: "/Dashboard");

app.UseSpa(spa =>
{
	spa.Options.SourcePath = "ClientApp";
});
app.UseAuthorization();

app.MapHub<NotificationHub>("/notificationHub");
app.MapControllers();

app.Run();
