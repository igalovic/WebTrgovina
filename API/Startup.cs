using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using AutoMapper;
using API.Middleware;
using API.Extensions;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) //add to service so we can use it in other parts of application
        {

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            services.AddDbContext<StoreContext>(x => x.UseSqlite(_config.GetConnectionString("DefaultConnection"))); //GetConnectionString - Shorthand for GetSection("ConnectionStrings")[name]. Drzi context aktivnom dok god je aktivan http request s atributom scope

            services.AddApplicationServices();
            services.AddSwaggerDocumentation();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseSwaggerDocumentation();

            app.UseStatusCodePagesWithReExecute("/errors/{0}"); //in the event that request comes into our API server, but we do not have an end point that matches that particular request, then we are going to hit this bit of middleware and it's going to redirect to our errors controller and pass in the status code and in our errors controller 

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles(); //prepoznavanje slika koje ce vracati api putem linka. Sve u ovoj metodi(Configure) su middlewari 

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
