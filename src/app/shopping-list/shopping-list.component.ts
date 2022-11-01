import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as slActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private isChangeSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /*
    this.ingredients = this.slService.getIngredients();
    this.isChangeSub = this.slService.ingredientsChanged.subscribe(
      (data: Ingredient[]) => {this.ingredients = data;}
    ); */
  }

  onEditing(index: number){
    this.store.dispatch(new slActions.StartEdit(index));
      //this.slService.startedEditing.next(index);
  }

 ngOnDestroy(): void {
   //this.isChangeSub.unsubscribe();
 }
}
