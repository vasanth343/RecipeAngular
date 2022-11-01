import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipes.action';

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy{
    userSub: Subscription;
    isAuthenticated: boolean = false;
    constructor(private dsService: DataStorageService, 
                private authService: AuthService,
                private store: Store<fromApp.AppState> ){}
    ngOnInit(): void {
      this.userSub = this.store.select('auth').pipe(map( authState => authState.user)).subscribe( (user) => {
        this.isAuthenticated = !!user;
      })
    }
    onSaveData(){
      //this.dsService.storeData();
      this.store.dispatch(new RecipeActions.StoreRecipes());
    }
    onFetchData(){
      this.dsService.fetchData().subscribe();
      //this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
      this.authService.logOut();
    }
    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
}
