import { Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipes.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{
    @Effect()
    fetchRecipe = this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
        return this.http.get<Recipe[]>
        ('https://ng-course-app-cfea7-default-rtdb.firebaseio.com/recipes.json')
    }), map( recipes => {
        return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
        })
    }), map( (recipes) => {
        return new RecipeActions.SetRecipes(recipes);
    })
    );
    
    @Effect({dispatch:false})
    storeRecipes = this.actions$.pipe(ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipeState]) => {
        return this.http.put('https://ng-course-app-cfea7-default-rtdb.firebaseio.com/recipes.json', 
        recipeState.recipes);
    })
    )
    constructor(private actions$: Actions, 
        private http: HttpClient,
        private store: Store<fromApp.AppState>){}
}                                  