import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap} from 'rxjs/operators';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { Store } from "@ngrx/store";
import * as recipeActions from '../recipes/store/recipes.action';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, 
      private recipe: RecipeService, 
      private store: Store<fromApp.AppState>){}

    storeData(){
      const recipeData = this.recipe.getRecipe();
      this.http.put('https://ng-course-app-cfea7-default-rtdb.firebaseio.com/recipes.json', recipeData).subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
    fetchData(){

        return this.http.get<Recipe[]>('https://ng-course-app-cfea7-default-rtdb.firebaseio.com/recipes.json').pipe(
        map((recipes) => {
        return recipes.map( (recipe) => {
          return new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients?recipe.ingredients:[]);
        })
      }),
      tap( (recipes) => {
        //this.recipe.setRecipes(recipes);
        this.store.dispatch(new recipeActions.SetRecipes(recipes));
      })
      )
    }
}
