import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    public appService:AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    var body = {
      "email" : this.loginForm.value["email"],
      "password" : this.loginForm.value["password"]
    };
    this.appService.Login(body).subscribe( response => {
      console.log(response);
      if (response[0] != null){
      localStorage.setItem('firstname', response[0]["firstname"]);
      var body = {
        "firstname" : response[0]["firstname"],
        "loggedIn" : true,
        "isAdmin" : false
      }
      if (response[0]["accessLevel"] == "1") {
        body["isAdmin"] = true;
      }
      var tempName = body['firstname'].charAt(0).toUpperCase() + body['firstname'].slice(1);
      localStorage.setItem("firstname", tempName);
      localStorage.setItem("loggedIn", body["loggedIn"] + "");
      localStorage.setItem("isAdmin", body["isAdmin"] + "");
      console.log(body);
      this.appService.passAuthenticationToNav.next(body);
      this.appService.passFirstName.next(tempName);
      this.router.navigate(['home']);
    }
    else {
      alert("Email or password incorrect!");
    }
    },
    error => {
      console.log(error);
    });
  }

}