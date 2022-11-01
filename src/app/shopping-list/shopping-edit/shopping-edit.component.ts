import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as slActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        );
      }else{
        this.editMode = false;
      }
    })

  }

  onAdded(){
    const val = this.slForm.value
    const newIng = new Ingredient(val.name, val.amount);
    console.log(this.slForm);
    if (this.editMode){
      //this.slService.updateIngredient(this.editedItemIndex, newIng);
      this.store.dispatch(new slActions.UpdateIngredient(newIng));
    }else{
      this.store.dispatch(new slActions.AddIngredient(newIng));
      //this.slService.addIngredient(newIng);
    }
    this.editMode = false;
    //this.slForm.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new slActions.StopEdit());
  }
  onDelete(){
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new slActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new slActions.StopEdit());
  }
}
