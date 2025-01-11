using LOG_RT_DISTRIBUICAO_CORE.Dto;
using Microsoft.EntityFrameworkCore;


namespace LOG_RT_DISTRIBUICAO_CORE {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ProdutoDto> Produtos { get; set; }

    }

}
