import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as fromAuth from './auth.actions';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
  }

@Injectable()
export class AuthEffects{
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(fromAuth.LOGIN_START),
        switchMap((authData: fromAuth.LoginStart) => {
            console.log(authData.payload)
            return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4frYK0cYpmWPiXQ329pjri6KzK7EpzxU",
            {
              email: authData.payload.email,
              password: authData.payload.email,
              returnSecureToken: true
            }).pipe(
                map( (resData) => { 
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
                return new fromAuth.Login({
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    expirationDate: expirationDate
                });
                
            }), 
                catchError((error) => {
                    return of();
                })
            );
        })
    );
    constructor(private actions$: Actions, private http: HttpClient){}
}