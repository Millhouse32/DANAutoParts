import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
  }

  onSend(){
    const connection = webSocket('ws://localhost:9292');

    connection.subscribe();

    connection.next({tablename: 'hello world'});
  }

}
