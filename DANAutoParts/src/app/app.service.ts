import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient:HttpClient) { }

  getWelcome():Observable<any> {
    return this.httpClient.get('http://localhost:3000/welcome/');
  }

  getCars():Observable<any> {
    return this.httpClient.get('http://localhost:3000/cars/');
  }
}
