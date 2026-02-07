using System;

namespace API.Croe;

public interface IUnitOfWork
{
    Task CompleteAsync();
}
