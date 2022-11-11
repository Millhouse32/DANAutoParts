import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

   searchTerm = '';
   form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService
  ) { 
    this.form = formBuilder.group({
      search: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value);
    var body = {
      "keyword" : this.form.value['search']
    };
    this.appService.SearchAll(body).subscribe(
      response => {
        console.log(response);
      },
      error => {
         console.log(error);
      }
    );
  }

}
