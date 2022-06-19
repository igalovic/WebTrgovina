namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
         Task CacheResposneAsync(string cacheKey, object response, TimeSpan timeToLive);
         Task<string> GetCachedResponseAsync(string cacheKey);

    }
}