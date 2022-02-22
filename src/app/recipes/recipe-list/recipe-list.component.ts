import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
  
})
export class RecipeListComponent implements OnInit {
 //@Output() recipeWasSelected = new EventEmitter<Recipe>();
 recipes!: Recipe[];
  
//  recipes: Recipe[]= [
//   new Recipe('A Test Recipe','This is simply a test','https://howtoeathealthy.com/images/recipes.jpg'),
//   new Recipe('Another Test Recipe','This is simply a test','https://howtoeathealthy.com/images/recipes.jpg')
// ];
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
  }
//   onRecipeSelected(recipe:Recipe){
//     this.recipeWasSelected.emit(recipe);
//   }
 }
