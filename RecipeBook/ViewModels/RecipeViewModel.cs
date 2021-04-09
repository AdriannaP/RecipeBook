using RecipeBook.Data;
using RecipeBook.Models;
using System.Collections.Generic;

namespace RecipeBook.ViewModels
{
    public class RecipeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Instruction { get; set; }
        public string Type_of_dish { get; set; }
        public IList<IngredientAssignment> Ingredients { get; set; }
    }
}
