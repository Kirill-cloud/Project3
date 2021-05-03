using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository
{
	public class TableRepository : BaseRepository, ITableRepository
	{
		public TableRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

		//public async Task<Page<Post>> GetPosts(int index, int pageSize, string tag = null)
		//{
		//	var result = new Page<Post>() { CurrentPage = index, PageSize = pageSize };

		//	using (var context = ContextFactory.CreateDbContext(ConnectionString)) // 1
		//	{
		//		var query = context.Posts.AsQueryable();
		//		if (!string.IsNullOrWhiteSpace(tag))
		//		{
		//			query = query.Where(p => p.Tags.Any(t => t.TagName == tag));
		//		}

		//		result.TotalPages = await query.CountAsync();
		//		query = query.Include(p => p.Tags).Include(p => p.Comments).OrderByDescending(p => p.CreatedDate).Skip(index * pageSize).Take(pageSize); // 2
		//		result.Records = await query.ToListAsync(); //3
		//	}

		//	return result;
		//}
	}
}
