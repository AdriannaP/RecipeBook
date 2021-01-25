using RecipeBook.Data;
using RecipeBook.Models;
using RecipeBook.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeBook.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly ApplicationDbContext appDbContext;

        public RecipeService (ApplicationDbContext applicationDbContext)
        {
            appDbContext = applicationDbContext;
        }

        public RecipeViewModel GetRecipeViewModel(int id)
        {
            var recipe = appDbContext.Recipes.FirstOrDefault(m => m.Id == id);
            var ingredientAssignments = appDbContext.IngredientAssignments.Select(n => n).Where(c => c.Recipe.Id == recipe.Id).ToList();

            RecipeViewModel recipeViewModel = new RecipeViewModel
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Instruction = recipe.Instruction,
                Ingredients = ingredientAssignments
            };
            return recipeViewModel;
        }

        public IList<RecipeViewModel> GetRecipes()
        {
            var recipes = appDbContext.Recipes.ToList();
            IList<RecipeViewModel> recipeViewModels = new List<RecipeViewModel>(); 
            foreach(Recipe recipe in recipes)
            {
                var ingredientAssignments = appDbContext.IngredientAssignments.Select(n => n)
                    .Where(c => c.Recipe.IsActive)
                    .Where(c => c.Recipe.Id == recipe.Id).ToList();

                RecipeViewModel recipeViewModel = new RecipeViewModel
                {
                    Id = recipe.Id,
                    Name = recipe.Name,
                    Instruction = recipe.Instruction,
                    Ingredients = ingredientAssignments
                };
                recipeViewModels.Add(recipeViewModel);
            }
            return recipeViewModels;
        }

        public RecipeViewModel EditRecipeViewModel(RecipeViewModel recipeViewModelToUpdate)
        {
            var recipe = appDbContext.Recipes.FirstOrDefault(r => r.Id == recipeViewModelToUpdate.Id);
            recipe.Name = recipeViewModelToUpdate.Name;
            recipe.Instruction = recipeViewModelToUpdate.Instruction;

            var ingredientsToRemove = appDbContext.IngredientAssignments.Select(n => n)
                .Where(c => c.IsActive)
                .Where(c => c.Recipe.Id == recipeViewModelToUpdate.Id)
                .ToList();

            foreach (var ingredient in ingredientsToRemove)
            {
                ingredient.IsActive = false;
            }

            foreach (var ingredientAssigment in recipeViewModelToUpdate.Ingredients)
            {
                var ingredient = appDbContext.Ingredients.FirstOrDefault(c => c.Id == ingredientAssigment.Id);

                var ingredientAssignment = new IngredientAssignment()
                {
                    IsActive = true,
                    Recipe = recipe,
                    Ingredient = ingredient,
                    Quantity = ingredientAssigment.Quantity
                };
            }

            appDbContext.SaveChanges();
            return recipeViewModelToUpdate;
        }
    }
}
