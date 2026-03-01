using System;
using System.Linq.Expressions;
using API.Core.Models;

namespace API.Extensions;

public static class IQueryableExtensions
{
    public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, 
        IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
    {
        if(string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
            return query;

        if (queryObj.IsSortAscending)
            return query.OrderBy(columnsMap[queryObj.SortBy]);
        else
            return query.OrderByDescending(columnsMap[queryObj.SortBy]);
    }
}
