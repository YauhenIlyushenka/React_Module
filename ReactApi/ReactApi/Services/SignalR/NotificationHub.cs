using Microsoft.AspNetCore.SignalR;
using ReactApi.Infrastructure;

namespace ReactApi.Services.SignalR
{
	public class NotificationHub : Hub
	{
		public async Task SendMessage(string user, string message)
			=> await Clients.All.SendAsync(SignalRConfig.MethodName, user, message);
	}
}
