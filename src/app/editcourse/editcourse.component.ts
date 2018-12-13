import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {

  course_title: string = null;
  original_course_name: string = null;
  course_id: string = null;
  apiUrl = environment.urlAddress;



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.course_title = urlParameters['course'];
      this.original_course_name = urlParameters['course'];
      this.course_id = urlParameters['course_id'];
    }); 

  }

  editCourse(form: NgForm) {
    let token = localStorage.getItem("jwt");
    let editCourse = JSON.stringify(form.value);
    console.log(form.value);
    this.http.post(this.apiUrl+"/api/courses/" + this.original_course_name 
    + "/course/edit/" + this.course_id, editCourse, {
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

  //

}
