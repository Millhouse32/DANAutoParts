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
  cartResults:any = [];

  ngOnInit(): void {

    var body = {
      id: localStorage.getItem('id')
    };

    this.appService.GetCart(body).subscribe( response => {
      console.log(response[0]);
      if (response[0].length != 0)
        this.cartResults = response[0];
      else {
        this.cartResults = ['empty'];
      }
    });
  }

  checkout(){

    console.log(this.cartResults);
    this.cartResults.forEach(element => {
      console.log(element.PLU);

      var getPoundsSoldBody = {
        PLU : element.PLU
      };

      this.appService.GetPoundsSold(getPoundsSoldBody).subscribe( response => {

        var currentPoundsSold;

        if (response[0].length != 0){
          currentPoundsSold = response[0][0]['PoundsSold'];
          console.log(response[0]);
        }
        else if (response[1].length != 0) {
          currentPoundsSold = response[1][0]['PoundsSold'];
          console.log(response[1]);
        }
        else {
          currentPoundsSold = response[2][0]['PoundsSold'];
          console.log(response[2]);
        }
        var newPoundsSold = currentPoundsSold + element.Quantity;
        console.log("new pounds sold :: " + newPoundsSold);

        var updatePoundsSoldBody = {
          "PLU" : element.PLU,
          "val" : Number(newPoundsSold)
        }

        console.log(updatePoundsSoldBody);
         this.appService.UpdatePoundsSold(updatePoundsSoldBody).subscribe( response => {
           console.log(response);
         });
      });

    });

    setTimeout(() => {     var body = {
      'id' : localStorage.getItem('id')
    };
    this.appService.DropCart(body).subscribe( response => {
      console.log(response);
    });
    this.notifierService.showNotification('Purchase Complete!', 'OK', 'success');
    this.cartResults = ['empty'];
  }, 2000);
  }

  removeFromCart(inPLU: any) {
    var body = {
      id : localStorage.getItem('id'),
      PLU : inPLU
    };

    this.appService.RemoveFromCart(body).subscribe( response => {
      if (response[0].length != 0)
        this.cartResults = response[0];
      else {
        this.cartResults = ['empty'];
      }
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

