using Microsoft.AspNetCore.SignalR;
using ReactApi.Infrastructure;
using ReactApi.Services.SignalR;

namespace ReactApi.Services
{
	public class JobRunService : IJobRunService
	{
		private readonly IHubContext<NotificationHub> _hubContext;
		public JobRunService(IHubContext<NotificationHub> hubContext)
		{
			_hubContext = hubContext;
		}

		public async Task LongRunningTask(string typeOfJob)
		{
			var random = new Random();
			await Task.Delay(random.Next(5, 31));

			await _hubContext.Clients.All.SendAsync(SignalRConfig.MethodName, SignalRConfig.MoqUserId, $"{typeOfJob} job completed");
		}
	}
}
