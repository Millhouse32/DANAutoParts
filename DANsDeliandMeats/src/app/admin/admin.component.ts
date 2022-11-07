import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public appService:AppService) { 

  }

  ngOnInit(): void {
  }

  onSend(){

    this.appService.passFirstName.next("HELLO WORLD");
    const connection = webSocket('ws://localhost:9292');

    connection.subscribe();

    connection.next({tablename: 'hello world'});


  }

}
