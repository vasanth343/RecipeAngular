import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLoginMode: boolean = false;
    isLoading: boolean = false;
    error = null;

    constructor(private authService: AuthService, 
      private router: Router,
      private store: Store<fromApp.AppState>){}
    ngOnInit(): void {
      this.store.select('auth').subscribe( authData => {
        this.isLoading = authData.loading;
        this.error = authData.authError;
      })
    }

    onSwitchMode(){
      this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(authForm: NgForm){
      if (!authForm.valid){
        return;
      }
      const email = authForm.value.email;
      const password = authForm.value.password;
      let authObs: Observable<AuthResponseData>

      this.isLoading = true;
      if (this.isLoginMode){
        authObs = this.authService.logIn(email, password);
        //this.store.dispatch(new fromAuth.LoginStart({email: email, password: password}));
      }
      else{
        authObs = this.authService.signUp(email, password);
      }
  
      authObs.subscribe( (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorMes) => {
        console.log(errorMes);
        this.error = errorMes;
        this.isLoading = false;
      } )  
      authForm.reset();
    }
}
