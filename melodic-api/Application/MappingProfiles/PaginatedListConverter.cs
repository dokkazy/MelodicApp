using AutoMapper;

namespace Application.MappingProfiles;

public class PaginatedListConverter<TSource, TDestination>
    : ITypeConverter<PaginatedList<TSource>, PaginatedList<TDestination>>
{
    public PaginatedList<TDestination> Convert(PaginatedList<TSource> source, PaginatedList<TDestination> destination, ResolutionContext context)
    {
        // Map each item in the PaginatedList
        var items = source.Items.Select(item => context.Mapper.Map<TDestination>(item)).ToList();

        // Return a mapped PaginatedList
        return new PaginatedList<TDestination>(items, source.TotalPages, source.PageIndex, source.Items.Count);
    }
}