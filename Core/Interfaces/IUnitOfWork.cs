using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable //Disposable looks for a disposed method in unit of work class and when finished with transaction it is going to dispose of our context
    {

        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;

        Task<int> Complete();
    }
}