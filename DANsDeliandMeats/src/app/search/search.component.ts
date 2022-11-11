import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

interface FilterProductType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filterProduct:FilterProductType[] = [
    { value: 'all', viewValue: 'All Products' },
    { value: 'beef', viewValue: 'Beef Products' },
    { value: 'pork', viewValue: 'Pork Products' },
    { value: 'chicken', viewValue: 'Chicken Products' }
  ]

   searchTerm = '';
   form: FormGroup = new FormGroup({});
   selectedOption = 'all';

  constructor(
    private formBuilder: FormBuilder,
    public appService: AppService
  ) { 
    this.form = formBuilder.group({
      search: [null, [Validators.required]],
    });


  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value);
    var body = {
      "keyword" : this.form.value['search']
    };
    if (this.selectedOption == 'all') {
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

  filterChange(event: any) {
    this.selectedOption = event;
  }

}
