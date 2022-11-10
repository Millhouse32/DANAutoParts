import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AppService } from '../app.service';
import { ModalService } from '../_modal';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(public appService:AppService,
  private modalService:ModalService,
  private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
        this.appService.GetAdmins().subscribe(
      resposne => {
        this.adminUsers = resposne;
        console.log(this.adminUsers);
      },
      error => {
         console.log(error);
      }
    );
        this.grantAccessForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
    });
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

  submitAdmin() {
        if (!this.grantAccessForm.valid) {
      return;
    }
    var body = {
      "email" : this.grantAccessForm.value["email"],
    };
    console.log(body);
  }



}
