import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public appService:AppService) { }

  displayedColumns: string[] = ['Product', 'Price', 'Quantity', 'AddToCart'];
  hasItems = false;
  cartResults:any = ['false'];

  ngOnInit(): void {

    var body = {
      id: localStorage.getItem('id')
    };

    this.appService.GetCart(body).subscribe( response => {
      console.log(response);
    });
  }
}

