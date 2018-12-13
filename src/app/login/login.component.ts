import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean;
  apiUrl = environment.urlAddress;

  constructor(private router: Router, private http: HttpClient) { }

  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.http.post(this.apiUrl+"/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/JSON"
      })
    }).subscribe(response => {
      let token =(<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/courses"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
