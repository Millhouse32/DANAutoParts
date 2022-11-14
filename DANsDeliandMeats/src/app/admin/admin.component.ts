import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AppService } from '../app.service';
import { ModalService } from '../_modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';


interface MeatType {
  value: string;
  viewValue:string;
}

interface ChangePrice {
  value: {},
  viewValue:string;
}

interface ChangePriceType {
  value: string;
  viewValue:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  grantAccessForm: any;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  adminUsers = [];
  displayedColumns: string[] = ['Name', 'Email'];
  topSellers = [];
  displayedColumnsTopSellers: string[] = ['PLU', 'Product', 'Pounds Sold'];

  selectedOption = 'general';
  selectedPriceChangeType = '';
  currentPrice = -999;

  meatType:MeatType[] = [
    {value: 'general', viewValue: 'General'},
    {value: 'chicken', viewValue: 'Chicken'},
    {value: 'pork', viewValue: 'Pork'},
    {value: 'beef', viewValue: 'Beef'}
  ]

  changePriceType:ChangePriceType[] = [
    { value: 'chicken', viewValue: 'Chicken'},
    { value: 'pork', viewValue: 'Pork'},
    { value: 'beef', viewValue: 'Beef'}
  ]

  changePrice:ChangePrice[] = [];

  form: FormGroup = new FormGroup({});
  changePriceForm: FormGroup = new FormGroup({});

  constructor(public appService:AppService,
  private modalService:ModalService,
  private formBuilder: FormBuilder,
  private router: Router,
  private notifierService:NotifierService) { 

    this.form = formBuilder.group({
      product: [this.selectedOption, [Validators.required]],
    })

    this.changePriceForm = formBuilder.group({
        productType: [null, Validators.required],
        product: [null, Validators.required],
        price: [null, Validators.required]
    })

  }

  ngOnInit(): void {
        this.appService.GetAdmins().subscribe(
      response => {
        this.adminUsers = response;
        console.log(this.adminUsers);
      },
      error => {
         console.log(error);
      }
    );
        this.grantAccessForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
    });

    this.topSellersChange('general');
  }

  onSend(){

    this.appService.passFirstName.next("HELLO WORLD");
    const connection = webSocket('ws://localhost:9292');

    connection.subscribe();

    connection.next({tablename: 'hello world'});


  }

  onGrantAccess() {
    this.grantAccessForm.reset();
    this.modalService.open('GrantAccess')
  }

  submit() {
        if (this.grantAccessForm.valid) {
          var body = {
            "email" : this.grantAccessForm.value["email"]
          }
          this.appService.GrantAccess(body).subscribe(resposne => {
            console.log(resposne);
            console.log('user granted admin access');
            window.location.reload();
            this.modalService.close('GrantAccess');

          },
          error => {
            this.notifierService.showNotification('User not found!', 'OK', 'error')
            this.grantAccessForm.reset();
          });
        }
    }

    get f(){
      return this.form.controls;
    }

    topSellersChange(event: any) {
      if (event == 'general') {
        this.appService.TopSellersGeneral().subscribe(
          response => {
            this.topSellers = response;
            console.log(response);
          },
          error => {
             console.log(error);
          }
        );
      }
      else if (event == 'chicken') {
        this.appService.TopSellersChicken().subscribe(
          response => {
            this.topSellers = response;
            console.log(response);
          },
          error => {
             console.log(error);
          }
        );
      }
      else if (event == 'pork') {
        this.appService.TopSellersPork().subscribe(
          response => {
            this.topSellers = response;
            console.log(response);
          },
          error => {
             console.log(error);
          }
        );
      }
      else {
        this.appService.TopSellersBeef().subscribe(
          response => {
            this.topSellers = response;
            console.log(response);
          },
          error => {
             console.log(error);
          }
        );
      }
    }

    selectPriceTypeChange(event:any) {
      if (event == 'beef') {
        this.appService.GetAllBeef().subscribe(
          response => {
            this.changePrice = [];
            //console.log(response);
            for (let result of response) {
              this.changePrice.push({value : { PLU : result.PLU, name : result.Item, price : result.Price }, viewValue : result.Item});
            }
          },
          error => {
            console.log(error);
          }
        );
      }
      else if (event == 'pork') {
        this.appService.GetAllPork().subscribe(
          response => {
            //console.log(response);
            this.changePrice = [];
            for (let result of response) {
              this.changePrice.push({value : { PLU : result.PLU, name : result.Item, price : result.Price }, viewValue : result.Item});
            }
          },
          error => {
            console.log(error);
          }
        );
      }
      else if (event == 'chicken') {
        this.appService.GetAllChicken().subscribe(
          response => {
            //console.log(response);
            this.changePrice = [];
            for (let result of response) {
              this.changePrice.push({value : { PLU : result.PLU, name : result.Item, price : result.Price }, viewValue : result.Item});
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    selectProductChange(event:any) {
      console.log(event);
      this.currentPrice = event['price'];
    }

    changePriceSubmit(){
      console.log(this.changePriceForm.value);
      var body = {
        table : this.changePriceForm.value['productType'],
        PLU : this.changePriceForm.value['product']['PLU'],
        price : this.changePriceForm.value['price']
      };
      this.appService.PriceChange(body).subscribe(
        response => {
          console.log(response);
          if (response['success'] == true) {
            this.notifierService.showNotification('Price Updated!', 'OK', 'success');
            this.currentPrice = this.changePriceForm.value['price'];
          }
        },
        error => {
          console.log(error);
        }
      )
    }
}
