namespace ReactApi.Services
{
	public interface IJobRunService
	{
		Task LongRunningTask(string typeOfJob);
	}
}