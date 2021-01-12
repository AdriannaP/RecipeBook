using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RecipeBook.Data;
using RecipeBook.ViewModels;

namespace RecipeBook.Controllers
{
    public class RecipeViewModelsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RecipeViewModelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: RecipeViewModels
        public async Task<IActionResult> Index()
        {
            return View(await _context.RecipeViewModel.ToListAsync());
        }

        // GET: RecipeViewModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recipeViewModel = await _context.RecipeViewModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (recipeViewModel == null)
            {
                return NotFound();
            }

            return View(recipeViewModel);
        }

        // GET: RecipeViewModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: RecipeViewModels/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Instruction")] RecipeViewModel recipeViewModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(recipeViewModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(recipeViewModel);
        }

        // GET: RecipeViewModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recipeViewModel = await _context.RecipeViewModel.FindAsync(id);
            if (recipeViewModel == null)
            {
                return NotFound();
            }
            return View(recipeViewModel);
        }

        // POST: RecipeViewModels/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Instruction")] RecipeViewModel recipeViewModel)
        {
            if (id != recipeViewModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(recipeViewModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RecipeViewModelExists(recipeViewModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(recipeViewModel);
        }

        // GET: RecipeViewModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recipeViewModel = await _context.RecipeViewModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (recipeViewModel == null)
            {
                return NotFound();
            }

            return View(recipeViewModel);
        }

        // POST: RecipeViewModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var recipeViewModel = await _context.RecipeViewModel.FindAsync(id);
            _context.RecipeViewModel.Remove(recipeViewModel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RecipeViewModelExists(int id)
        {
            return _context.RecipeViewModel.Any(e => e.Id == id);
        }
    }
}
