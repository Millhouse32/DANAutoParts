import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public appService:AppService,
    private notifierService:NotifierService) { }

  displayedColumns: string[] = ['Product', 'Price', 'Quantity', 'Remove'];
  hasItems = true;
  cartResults:any = ['false'];

  ngOnInit(): void {

    var body = {
      id: localStorage.getItem('id')
    };

    this.appService.GetCart(body).subscribe( response => {
      console.log(response[0]);
      this.cartResults = response[0];
    });
  }

  checkout(){
    var body = {
      'id' : localStorage.getItem('id')
    };
    this.appService.DropCart(body).subscribe( response => {
      console.log(response);
    });
    this.notifierService.showNotification('Purchase Complete!', 'OK', 'success');
    this.cartResults = [];
  }
}

