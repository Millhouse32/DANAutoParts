import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Output() public getAuthStatusChange = new EventEmitter<boolean>();


  @Output() OutputToParent = new EventEmitter<any>();

  email:string = '';
  password:string = '';
  firstname:string = '';
  lastname:string = '';
  confirmPassword:string = '';


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
  private modalService: ModalService) {}

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme')=== "Dark" ? true:false;
    this.appCom.isAuthObs.subscribe(loggedIn => this.loggedIn = loggedIn);
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

}

signUp() {

}

}
