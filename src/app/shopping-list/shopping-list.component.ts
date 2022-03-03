import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients!: Ingredient[];
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples',5),
  //   new Ingredient('Mangos',10),
  // ];
  constructor(private slService:ShoppingListService) { }
  private igChangeSub!:Subscription;
  ngOnInit() {
    this.ingredients=this.slService.getIngredient();
    // this.slService.ingredientsChanged
    // .subscribe(
    //   (ingredients:Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
     this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }
  // onIngredientAdded(ingredient:Ingredient) {
  //  // this.ingredients.push(ingredient);
  // }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }

}
