﻿using Application.Contracts.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Application.ExtensionMethods;

public static class PagingExtensions
{
    public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageNumber, int pageSize) where TDestination : class
        => PaginatedList<TDestination>.CreateAsync(queryable.AsNoTracking(), pageNumber, pageSize);
}