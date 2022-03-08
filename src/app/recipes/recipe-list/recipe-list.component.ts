import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
  
})
export class RecipeListComponent implements OnInit , OnDestroy{
 //@Output() recipeWasSelected = new EventEmitter<Recipe>();
 recipes!: Recipe[];
 subscription!: Subscription;
  
//  recipes: Recipe[]= [
//   new Recipe('A Test Recipe','This is simply a test','https://howtoeathealthy.com/images/recipes.jpg'),
//   new Recipe('Another Test Recipe','This is simply a test','https://howtoeathealthy.com/images/recipes.jpg')
// ];
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.subscription= this.recipeService.recipesChanged
      .subscribe(
        (recipes:Recipe[])=>{
          this.recipes=recipes;
        }
      )
    this.recipes=this.recipeService.getRecipes();
  }
   //onRecipeSelected(recipe:Recipe){
    //this.recipeWasSelected.emit(recipe);
    //}

    onNewRecipe(){
      this.router.navigate(['new'],{relativeTo:this.route});
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
 }
