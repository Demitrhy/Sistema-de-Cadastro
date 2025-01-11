using LOG_RT_DISTRIBUICAO_CORE;
using System;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Service;
using LOG_RT_DISTRIBUICAO_CORE.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio;

public class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Obter variáveis de ambiente
        string server = Environment.GetEnvironmentVariable("SERVER");
        string database = Environment.GetEnvironmentVariable("DATABASE");

        if (string.IsNullOrEmpty(server) || string.IsNullOrEmpty(database)) {
            throw new InvalidOperationException("As variáveis de ambiente 'SERVER' ou 'DATABASE' não estão configuradas corretamente.");
        }

        string connectionString = $"Server={server};Database={database};Trusted_Connection=True;";

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

        builder.Services.AddScoped<SqlConnection>(_ => new SqlConnection(connectionString));

        builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
        builder.Services.AddScoped<IProdutoService, ProdutoService>();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

    
        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
