using AutoMapper;
using E_commerce.Models;
using E_commerce.Services;
using E_commerce.UnitOfWorks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace E_commerce
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var origin = "AllowAllOrigins";

            // Add configuration file
            builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            // Configure services
            var services = builder.Services;
            var configuration = builder.Configuration;

            services.AddCors(options =>
            {
                options.AddPolicy(origin, policyBuilder =>
                {
                    policyBuilder.AllowAnyMethod()
                                 .AllowAnyHeader()
                                 .AllowAnyOrigin();
                });
            });

            services.AddControllers();
            services.AddDbContext<EcommerceContext>(options =>options.UseLazyLoadingProxies().UseSqlServer(configuration.GetConnectionString("con")));
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(typeof(MapingProfile)); 
            services.AddScoped<CartService>();
            services.AddScoped<ProductService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(origin);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
