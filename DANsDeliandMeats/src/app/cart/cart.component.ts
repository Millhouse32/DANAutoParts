import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { ModalService } from '../_modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  currentQuantity: any;
  currentPLU: any;

  constructor(public appService:AppService,
    private notifierService:NotifierService,
    public modalService:ModalService,
    private formBuilder: FormBuilder) { 

      this.form = formBuilder.group({
        quantity: [null, Validators.required]
    })
    }

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

    this.cartResults.array.forEach(element => {
      
      

      var poundsBody = {
        PLU : element.PLU,
        val : element.Quantity 
      };
      
      this.appService.UpdatePoundsSold(poundsBody).subscribe ( response => {
        console.log(response); 
      })
    });

    var body = {
      'id' : localStorage.getItem('id')
    };
    this.appService.DropCart(body).subscribe( response => {
      console.log(response);
    });
    this.notifierService.showNotification('Purchase Complete!', 'OK', 'success');
    this.cartResults = [];
  }

  removeFromCart(inPLU: any) {
    var body = {
      id : localStorage.getItem('id'),
      PLU : inPLU
    };

    this.appService.RemoveFromCart(body).subscribe( response => {
      console.log(response);
      this.cartResults = response[0];
    });
  }

  edit(PLU:any, Quantity:any) {
    this.form.reset();
    this.currentQuantity = Quantity;
    this.currentPLU = PLU;
    this.modalService.open('EditQuantity');
  }

  submitNewQuantity(){
    
    var body = {
      id : localStorage.getItem('id'),
      PLU : this.currentPLU,
      quantity : this.form.value['quantity']
    };
    
    this.appService.UpdateCart(body).subscribe ( response => {
      console.log(response);
      this.cartResults = response[0];
      this.notifierService.showNotification('Quantity Updated!', 'OK', 'success');
      this.modalService.close('EditQuantity');
    });
  }
}

