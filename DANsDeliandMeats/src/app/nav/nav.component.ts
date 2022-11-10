import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/_modal';
import { emit } from 'process';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Output() public getAuthStatusChange = new EventEmitter<boolean>();


  @Output() OutputToParent = new EventEmitter<any>();
  @Output() firstnameToHome = new EventEmitter<any>();

  email:string = '';
  password:string = '';
  firstname:any = '';
  lastname:string = '';
  confirmPassword:string = '';
  

  isAdmin: boolean = false;
  loggedIn: boolean = false;

  isDarkTheme:boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
  public loaderService:LoaderService,
  private router: Router,
  public appCom: AppComponent,
  private modalService: ModalService,
  public appService:AppService,
  private notifierService:NotifierService) {
    appService.passAuthenticationToNav$.subscribe(val => {
      this.firstname = val["firstname"];
      this.loggedIn = val["loggedIn"];
      this.isAdmin = val["isAdmin"];
    })
  }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme')=== "Dark" ? true : false;
    this.firstname = localStorage.getItem('firstname');
    this.loggedIn = localStorage.getItem('loggedIn') == "true" ? true : false;
    this.isAdmin = localStorage.getItem('isAdmin') == "true" ? true : false;
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  toSourceCode(){
    window.open('https://github.com/Millhouse32/DANAutoParts', '_blank');
  }

  toCart(){
    this.router.navigateByUrl('/cart');
  }

    openModal(id: string) {
    this.modalService.open(id);
    this.password = "";
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.confirmPassword = "";
}

closeModal(id: string) {
  this.modalService.close(id);
  this.password = "";
  this.firstname = "";
  this.lastname = "";
  this.email = "";
  this.confirmPassword = "";
}

login() {
  this.isAdmin = true;
  localStorage.setItem("isAdmin", "true");
  this.loggedIn = true;
  localStorage.setItem("loggedIn", "true");
  this.getAuthStatusChange.emit(true);
  console.log(this.email);
  
  var body = {
    "email" : this.email,
    "password" : this.password
  };

  this.appService.Login(body).subscribe( response => {
    console.log(response);
    localStorage.setItem('firstname', response[0]["firstname"]);
  },
  error => {
    console.log(error);
  });
}

signUp() {
  while(this.password != this.confirmPassword) {
    alert("Passwords do not match!");
    this.password = "";
    this.confirmPassword = "";
  }

    var body = {
      "firstname" : this.firstname,
      "lastname" : this.lastname,
      "email" : this.email,
      "password" : this.password
    };

    this.appService.AddUser(body).subscribe(
    resposne => {
      console.log(resposne);

    },
    error => {

    });
}

logout() {
  console.log("Logged out");
  this.firstname = "";
  this.loggedIn = false;
  this.isAdmin = false;
  this.appService.passFirstName.next("");
  localStorage.setItem("firstname", "");
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("isAdmin", "false");
  localStorage.setItem('id', '');
  this.router.navigate(['/home']);
}

}
