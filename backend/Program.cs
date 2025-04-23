using LOG_RT_DISTRIBUICAO_CORE;
using System;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Service;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.LOG_RT_DISTRIBUICAO_CORE.Repositorio;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Obter variáveis de ambiente
        string server = Environment.GetEnvironmentVariable("SERVER");
        string database = Environment.GetEnvironmentVariable("DATABASE");

        if (string.IsNullOrEmpty(server) || string.IsNullOrEmpty(database))
        {
            throw new InvalidOperationException("As variáveis de ambiente 'SERVER' ou 'DATABASE' não estão configuradas corretamente.");
        }
        string connectionString = $"Server={server};Database={database};Trusted_Connection=True;TrustServerCertificate=True;";


        // Serviços
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString)); // ✅ corrigido aqui

        builder.Services.AddScoped<SqlConnection>(_ => new SqlConnection(connectionString));
        builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
        builder.Services.AddScoped<IProdutoService, ProdutoService>();
        builder.Services.AddScoped<ICodigoService, CodigoService>();
        builder.Services.AddScoped<ILogin, LoginService>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
      



        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // CORS
        builder.Services.AddCors(options => {
            options.AddPolicy("PermitirReact", policy => {
                policy.WithOrigins(
                        "http://localhost:3000",
                        "https://localhost:3000",
                        "http://front-cadastro-pedido:3000",
                        "https://front-cadastro-pedido:3000"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });


        var app = builder.Build();

        // Middlewares
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }


        app.UseHttpsRedirection();

        app.UseCors("PermitirReact");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
