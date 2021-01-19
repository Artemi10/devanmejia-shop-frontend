import { Injectable } from '@angular/core';
// @ts-ignore
import jwt_decode from 'jwt-decode';
export const ACCESS_TOKEN_NAME: string = 'jwt_text';
export const REFRESH_TOKEN_NAME: string = 'refresh_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  getAccessTokenExpirationDateDate(token:string): Date{
    const decodedToken = jwt_decode(token);
    // @ts-ignore
    if(decodedToken.exp===undefined)
      throw new Error ("No expiration date in JWT");
    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(decodedToken.exp)
    return date;
  }

  isAccessTokenExpired(token?: string): boolean{
    if(!token) token = this.getAccessToken();
    if(!token) return true;
    try {
      const tokenDate = this.getAccessTokenExpirationDateDate(token);
      return !(tokenDate.valueOf()>new Date().valueOf());
    }catch (e) {return true;}
  }
  getAccessToken():string{
    return localStorage.getItem(ACCESS_TOKEN_NAME);
  }
  setAccessToken(token: string):void{
    this.deleteAccessToken()
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
  }
  deleteAccessToken():void{
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
  isAccessTokenExisted():boolean{
    return localStorage.getItem(ACCESS_TOKEN_NAME) !== null;
  }
  getUserName(){
    let decodedToken = jwt_decode(this.getAccessToken());
    // @ts-ignore
    return decodedToken.sub;
  }
  setRefreshToken(token: string){
    this.getRefreshToken();
    localStorage.setItem(REFRESH_TOKEN_NAME, token);
  }
  deleteRefreshToken(){
    localStorage.removeItem(REFRESH_TOKEN_NAME);
  }
  getRefreshToken():string{
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }
  isRefreshTokenExisted(){
    return localStorage.getItem(REFRESH_TOKEN_NAME) !== null;
  }
  getUserRole(){
    let decodedToken = jwt_decode(this.getAccessToken());
    return decodedToken.role;
  }

}
