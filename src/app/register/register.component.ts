import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  invalidRegister: boolean;
  apiUrl = environment.urlAddress;

  constructor(private router: Router, private http: HttpClient) { }

  register(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.http.post(this.apiUrl+"/api/auth/register", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/JSON"
      })
    }).subscribe(response => {
      let token =(<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidRegister = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidRegister = true;
    });
  }
}