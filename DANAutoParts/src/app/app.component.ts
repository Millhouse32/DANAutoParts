import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DANAutoParts';


  public loggedIn: boolean = localStorage.getItem("loggedIn") == "true" ? true : false;
  public currentUser: string = "";

  private _isAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthObs: Observable<boolean> = this._isAuthSubject.asObservable();

  @ViewChild('navUser', {static:false}) navUser: NavComponent;

  receiveFromChild:string = "";

  GetUser(newUser:string) {
    this.receiveFromChild = newUser;
  }

    authChanged(status: boolean){
      if (status) {
        localStorage.setItem("loggedIn", "true");
      }
      this.loggedIn = status;
  }
}
