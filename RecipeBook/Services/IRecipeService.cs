using RecipeBook.ViewModels;
using System.Collections.Generic;

namespace RecipeBook.Services
{
    public interface IRecipeService
    {
        RecipeViewModel GetRecipeViewModel(int Id);
        IList<RecipeViewModel> GetRecipes();
        RecipeViewModel EditRecipeViewModel(RecipeViewModel recipeViewModelToUpdate);
    }
}
