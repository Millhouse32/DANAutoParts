import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isDarkTheme:boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
  public loaderService:LoaderService,
  private router: Router) {}

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme')=== "Dark" ? true:false;
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

}
