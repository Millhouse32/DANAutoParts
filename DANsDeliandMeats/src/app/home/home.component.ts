import { Component, Input } from '@angular/core';
import { map, throwIfEmpty } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards:any = [];
  cardsForHandset = [];
  cardsForWeb = [];
  firstname:any = "";

  @Input() firstnameFromNav: any;

  url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl = 0;
  
  isHandset:boolean = false;
  isHandsetObserver:Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService:AppService,
    private notifierService:NotifierService,
    public sanitizer: DomSanitizer) {
      appService.passFirstNames$.subscribe(val=> {
        this.firstname = val;
        console.log(val);
      })
    }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();

    });
    this.firstname = localStorage.getItem('firstname');

    this.appService.getWelcome().subscribe(
      resposne => {
        this.cardsForHandset = resposne.handsetCards;
        this.cardsForWeb = resposne.webCards;
        this.loadCards();
      },
      error => {
         //alert('There was an error in receiving data from server. Please try again later.');
         this.notifierService.showNotification('There was an error in receiving data from server! Please try again later!', 'OK', 'error');
      }
    );
  }

  loadCards() {
    this.cards = this.isHandset? this.cardsForHandset:this.cardsForWeb;
  }

  getImage(imageName: string) :string {
    return 'url(' + 'http://localhost:3000/images/' + imageName + '.jpg' + ')';
  }

  getUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
