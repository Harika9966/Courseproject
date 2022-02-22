import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  private  recipes: Recipe[]= [
        new Recipe(
          'Fried Chicken Sandwich Recipe',
          'This Fried Chicken Sandwich is THE BEST! ',
          'https://img.freepik.com/free-photo/lunch-with-burgers-brown-background-two-juicy-burgers-with-french-fries-coke-fast-food_166116-3244.jpg?size=626&ext=jpg',
          [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',10)
          ]
        ),
        new Recipe(   
          'Spicy Chicken Pizza',
          'Here what you need pizza sauce, Franks Original',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ4jC8s_cogyu1pu_bX_v5Mhsz5frTpK6nUA&usqp=CAU',
          [
            new Ingredient('Buns',1),
            new Ingredient('egg',10)
          ]
        )
      ];

      constructor(private slService:ShoppingListService){}
      
      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);

      }

}