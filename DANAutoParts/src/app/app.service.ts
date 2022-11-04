import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
