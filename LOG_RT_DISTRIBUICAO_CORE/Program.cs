using LOG_RT_DISTRIBUICAO_CORE;
using System;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Service;
using LOG_RT_DISTRIBUICAO_CORE.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio;

public class Program {
    private static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Obter variáveis de ambiente
        string server = Environment.GetEnvironmentVariable("SERVER");
        string database = Environment.GetEnvironmentVariable("DATABASE");

        // Montar a string de conexão
        string connectionString = $"Server={server};Database={database};Trusted_Connection=True;\r\n";

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

        builder.Services.AddSingleton(new SqlConnection(connectionString));

        // Agora registrando o repositório sem a dependência circular
        builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
        builder.Services.AddScoped<IProduto, ProdutoService>();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configurações do pipeline de requisição
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
