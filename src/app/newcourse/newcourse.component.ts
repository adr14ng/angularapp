import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})
export class NewcourseComponent {

  apiUrl = environment.urlAddress;

  constructor(private router: Router, private http: HttpClient) { }

  newCourse(form: NgForm) {
    let token = localStorage.getItem("jwt");
    let newCourse = JSON.stringify(form.value);
    this.http.post(this.apiUrl+"/api/courses/course/add/new", newCourse, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.router.navigate(["/courses"]);
    }, err => {
      //Add route to handle error
      //Something like oops! That course already exists!
      this.router.navigate(["/courses"]);
    });
  }

}
