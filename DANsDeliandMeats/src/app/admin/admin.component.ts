import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminUsers = [];

  constructor(public appService:AppService) { 

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
  }

  onSend(){

    this.appService.passFirstName.next("HELLO WORLD");
    const connection = webSocket('ws://localhost:9292');

    connection.subscribe();

    connection.next({tablename: 'hello world'});


  }



}
