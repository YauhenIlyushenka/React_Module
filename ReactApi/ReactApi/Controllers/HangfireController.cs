using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReactApi.Services.SignalR;
using ReactApi.Services;
using ReactApi.Infrastructure;

namespace ReactApi.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class HangfireController: ControllerBase
	{
		private readonly IHubContext<NotificationHub> _hubContext;
		private readonly ILogger<HangfireController> _logger;
		private readonly IJobRunService _jobRunService;

		public HangfireController(
			IHubContext<NotificationHub> hubContext,
			ILogger<HangfireController> logger,
			IJobRunService jobRunService)
		{
			_hubContext = hubContext;
			_logger = logger;
			_jobRunService = jobRunService;
		}

		[HttpPost("FireAndForget")]
		public async Task<ActionResult> FireAndForget()
		{
			_logger.LogInformation($"New job enqueue request received at {DateTime.Now}");
			BackgroundJob.Enqueue(() => _jobRunService.LongRunningTask(SignalRConfig.FireAndForget));
			_logger.LogInformation($"Response sent back at {DateTime.Now}");

			await _hubContext.Clients.All.SendAsync(SignalRConfig.MethodName, SignalRConfig.MoqUserId, $"{SignalRConfig.FireAndForget} job started");
			return Ok("Fire-and-forget job started");
		}

		[HttpPost("DelayStart")]
		public async Task<ActionResult> DelayStart()
		{
			_logger.LogInformation($"New job enqueue request received at {DateTime.Now}");
			var jobId = BackgroundJob.Schedule(() => _jobRunService.LongRunningTask(SignalRConfig.DelayStart), TimeSpan.FromSeconds(60));

			_logger.LogInformation($"Response for JobId: {jobId} sent back at {DateTime.Now}");
			await _hubContext.Clients.All.SendAsync(SignalRConfig.MethodName, SignalRConfig.MoqUserId, $"{SignalRConfig.DelayStart} scheduled with JobId: {jobId}");
			return Ok($"Delayed job scheduled with JobId: {jobId}");
		}

		[HttpPost("RecurringJob")]
		public async Task<ActionResult> RepeatJob()
		{
			_logger.LogInformation($"New job enqueue request received at {DateTime.Now}");
			RecurringJob.AddOrUpdate("Recurring job", () => _jobRunService.LongRunningTask(SignalRConfig.RecurringJob), "*/1 * * * *");
			_logger.LogInformation($"Response for Recurring Job sent back at {DateTime.Now}");

			await _hubContext.Clients.All.SendAsync(SignalRConfig.MethodName, SignalRConfig.MoqUserId, $"{SignalRConfig.RecurringJob} added");
			return Ok("Recurring job added");
		}

		[HttpPost("DependentJob")]
		public async Task<ActionResult> ChildJob()
		{
			_logger.LogInformation($"New job enqueue request received at {DateTime.Now}");
			var jobId = BackgroundJob.Schedule(() => _jobRunService.LongRunningTask(SignalRConfig.DependentJob), TimeSpan.FromSeconds(10));
			BackgroundJob.ContinueJobWith(jobId, () => _jobRunService.LongRunningTask(SignalRConfig.DependentJob));

			_logger.LogInformation($"Response for dependent Job sent back at {DateTime.Now}");

			await _hubContext.Clients.All.SendAsync(SignalRConfig.MethodName, SignalRConfig.MoqUserId, $"{SignalRConfig.DependentJob} addeded");
			return Ok("Dependent job added");
		}
	}
}
