import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipes.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, 
            private route: ActivatedRoute, 
            private router: Router,
            private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => { 
        this.id = +params['id'];
        //this.recipe = this.recipeService.Recipe(this.id);
        this.store.select('recipes').pipe(map( recipeState => {
            return recipeState.recipes.find((value, index) => {
              return this.id === index;
            })
        })).subscribe(recipe => {
            this.recipe = recipe; 
        })
      }  
    );
  }
 
  onAddShoppingList(ingredients: Ingredient[]){
    this.recipeService.addRecipeToShoppingList(ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    //this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
