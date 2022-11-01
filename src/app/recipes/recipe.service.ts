import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs-compat';
import { Store } from '@ngrx/store';
import * as slActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();
  /* private recipes: Recipe[] = [
    new Recipe('Meat Recipe',
     "Test recipe description",
      "https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://static.onecms.io/wp-content/uploads/sites/43/2022/04/18/143809-best-steak-marinade-in-existence-ARMag-3x2-1.jpg&w=1280&h=720&q=90&c=cc",
      [new Ingredient("meat", 5), new Ingredient("Pepper", 20)]
      ),
    new Recipe('Noodles Recipe',
     "Test Recipe 2 description",
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https://tse3.mm.bing.net/th?id=OIP.jfIwsW5inYOekoigcEeesQHaFV&pid=15.1",
      [new Ingredient("bread", 2), new Ingredient('French Fries', 10)]
      )
]; */

    private recipes: Recipe[] = [];
    constructor(private store: Store<fromApp.AppState>){}

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
    getRecipe(){
        return this.recipes.slice();
    }
    Recipe(index: number){
      return this.recipes[index];
    }

    addRecipeToShoppingList(ingredients: Ingredient[]){
      //this.slService.addIngredients(ingredients);
      this.store.dispatch(new slActions.AddIngredients(ingredients));
    }
    addRecipe(newRecipe: Recipe){
      this.recipes.push(newRecipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
