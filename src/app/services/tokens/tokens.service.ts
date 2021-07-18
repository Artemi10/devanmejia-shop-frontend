import { Injectable, EventEmitter } from '@angular/core';
// @ts-ignore
import jwt_decode from 'jwt-decode';
import {Token, Tokens} from '../../models/tokens/tokens.model';
export const ACCESS_TOKEN_NAME = 'jwt_text';
export const REFRESH_TOKEN_NAME = 'refresh_token';
@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private refreshTokenFlag = true;
  public newRefreshTokenEvent = new EventEmitter();

  constructor() { }

  isTokensRefreshed(): boolean{
    return this.refreshTokenFlag;
  }

  getAccessTokenExpirationDateDate(token: string): Date{
    const decodedToken = jwt_decode(token);
    // @ts-ignore
    if (decodedToken.exp === undefined) {
      throw new Error ('No expiration date in JWT');
    }
    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  isAccessTokenExpired(token?: string): boolean{
    if (!token) { token = this.getAccessToken(); }
    if (!token) { return true; }
    try {
      const tokenDate = this.getAccessTokenExpirationDateDate(token);
      return !(tokenDate.valueOf() > new Date().valueOf());
    }catch (e) {return true; }
  }
  getAccessToken(): string{
    return localStorage.getItem(ACCESS_TOKEN_NAME);
  }
  setAccessTokenString(token: string): void{
    this.deleteAccessToken();
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
    this.refreshTokenFlag = true;
    this.newRefreshTokenEvent.emit();
  }
  setAccessToken(token: Token): void{
    this.setAccessTokenString(token.token);
  }
  setTokens(tokens: Tokens): void{
    this.setAccessTokenString(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
  }
  deleteAccessToken(): void{
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
  isAccessTokenExisted(): boolean{
    return localStorage.getItem(ACCESS_TOKEN_NAME) !== null;
  }
  public getUserName(): string{
    const decodedToken = jwt_decode(this.getAccessToken());
    // @ts-ignore
    return decodedToken.sub;
  }
  public setRefreshToken(token: string): void{
    localStorage.setItem(REFRESH_TOKEN_NAME, token);
  }
  public deleteRefreshToken(): void{
    localStorage.removeItem(REFRESH_TOKEN_NAME);
  }
  public getRefreshToken(): string{
    this.refreshTokenFlag = false;
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }
  public isRefreshTokenExisted(): boolean{
    return localStorage.getItem(REFRESH_TOKEN_NAME) !== null;
  }
  public getUserRole(): string{
    const decodedToken = jwt_decode(this.getAccessToken());
    // @ts-ignore
    return decodedToken.role;
  }

}

