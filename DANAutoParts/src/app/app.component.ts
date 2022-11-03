import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DANAutoParts';


  public loggedIn: boolean = false;
  public currentUser: string = "";

  private _isAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthObs: Observable<boolean> = this._isAuthSubject.asObservable();

    authChanged(status: boolean){
      this.loggedIn = status;
  }
}
