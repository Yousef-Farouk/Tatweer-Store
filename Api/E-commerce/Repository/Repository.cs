using E_commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly EcommerceContext db;

        public Repository(EcommerceContext _db)
        {
            db = _db;
        }
        public async Task Add(T obj)
        {
            await db.Set<T>().AddAsync(obj);
        }

        public async Task Delete(int id)
        {
            var obj = await db.Set<T>().FindAsync(id);

            db.Set<T>().Remove(obj);
        }

        public async Task Delete(T obj)
        {
            db.Set<T>().Remove(obj);
        }

        
        public async Task<List<T>> GetAll()
        {
            return await db.Set<T>().ToListAsync();
        }

     
        public async Task<T> GetById(int id)
        {
            return await db.Set<T>().FindAsync(id);
        }

        public async Task Update(T obj)
        {
            db.Set<T>().Update(obj);
        }

      
        public async Task<int> Save()
        {
            return await db.SaveChangesAsync();
        }

        public async Task<T> GetById(string id)
        {
            return await db.Set<T>().FindAsync(id);
        }

        public async Task Delete(string id)
        {
            var obj = await db.Set<T>().FindAsync(id);

            db.Set<T>().Remove(obj);
        }

    }
}
