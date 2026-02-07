using System;

namespace API.Persistence;

public interface IUnitOfWork
{
    Task CompleteAsync();
}
