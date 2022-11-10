import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient:HttpClient) { }

  getWelcome():Observable<any> {
    return this.httpClient.get('http://localhost:3000/welcome/');
  }

  AddUser(body: any):Observable<any> {
    return this.httpClient.post('http://localhost:3000/AddUser/', body);
  }

  Login(body: any):Observable<any> {
    return this.httpClient.post('http://localhost:3000/Login/', body);
  }

  CreateCart(body: any):Observable<any> {
    return this.httpClient.post('http://localhost:3000/CreateCart/', body);
  }

  DropCart(body: any):Observable<any> {
    return this.httpClient.post('http://localhost:3000/DropCart/', body);
  }

  GetAdmins():Observable<any> {
    return this.httpClient.get('http://localhost:3000/GetAdmins');
  }

  GrantAccess(body: any):Observable<any> {
    return this.httpClient.post('http://localhost:3000/GrantAccess', body);
  }

  public passFirstName = new BehaviorSubject<any>(""); 
  readonly passFirstNames$ = this.passFirstName.asObservable();

  public passAuthenticationToNav = new BehaviorSubject<any>("");
  readonly passAuthenticationToNav$ = this.passAuthenticationToNav.asObservable();
}
