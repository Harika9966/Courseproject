import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipesChanged=new Subject<Recipe[]>();
  // recipeSelected = new EventEmitter<Recipe>();
  //recipeSelected = new Subject<Recipe>();
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
          'Worlds Best Lasagna',
          'John Chandlers lasagna is our most popular recipe.',
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8963973.jpg&w=820&h=459&c=sc&poi=face&q=60',
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
      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);

      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

      }
      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}