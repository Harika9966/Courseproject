import { Component, ElementRef, EventEmitter, NgModule, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm!:NgForm;
  subscription!: Subscription;
  editMode=false;
  editedItemIndex!:number;
  editedItem!:Ingredient;
 //@ViewChild('nameInput',{static:false}) nameInputRef! : ElementRef;
 //@ViewChild('amountInput',{static:false}) amountInputRef! : ElementRef;
 //@Output() ingredientAdded = new EventEmitter<{name : string, amount : number}>();
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
  this.subscription = this.slService.startrdEditing
    .subscribe(
      (index:number) => {
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getIngredient(index);
       this.slForm.setValue({
         name:this.editedItem.name,
         amount:this.editedItem.amount
       })
      }
    );
  }


  onSubmit(form: NgForm){
    const value=form.value; 
    // const ingname = this.nameInputRef.nativeElement.value;
    // const ingamount = this.amountInputRef.nativeElement.value;
     const newIngredient = new Ingredient(value.name,value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    }else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
