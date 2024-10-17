using AutoMapper;
using System.Linq;

public class PaginatedListConverter<TSource, TDestination>
    : ITypeConverter<PaginatedList<TSource>, PaginatedList<TDestination>>
{
    public PaginatedList<TDestination> Convert(PaginatedList<TSource> source, PaginatedList<TDestination> destination, ResolutionContext context)
    {
        // Ánh xạ từng item trong danh sách của PaginatedList
        var items = source.Items.Select(item => context.Mapper.Map<TDestination>(item)).ToList();

        // Trả về một PaginatedList đã được ánh xạ
        return new PaginatedList<TDestination>(items, source.TotalPages, source.PageIndex, source.Items.Count);
    }
}
