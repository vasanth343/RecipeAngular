import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import { map} from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{


    constructor(private store: Store<AppState>,
                private dsService: DataStorageService,
                ){}
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('recipes').pipe(map(recipeState => {
          if (recipeState.recipes.length === 0){
              //console.log('recipes resolver and length is 0');
              this.dsService.fetchData().subscribe((recipes) => {
                return  recipes;
            })
          }
          else{
            //console.log('recipe resolver and length is not 0');
            return recipeState.recipes;
          }
        
       }
        ));
    }
}
