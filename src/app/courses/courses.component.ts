import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: []
})
export class CoursesComponent implements OnInit  {
  courses: any;
  apiUrl = environment.urlAddress;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(){
    let token = localStorage.getItem("jwt");
    this.http.get(this.apiUrl+"/api/courses", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response =>  {
      this.courses = response;
    }, err => {
      console.log(err);
    });

  }

  goToCoursePage(course) {
    this.router.navigate(['courses', course]);
  };

  goToEditCourse(course, course_id) {
    this.router.navigate(['courses/'+ course +'/course/edit/' + course_id]);
  }

  goToDeleteCourse(course, course_id) {
    this.router.navigate(['courses/'+ course +'/course/delete/' + course_id]);
  }

  goToAddCourse() {
    this.router.navigate(['courses/course/add/new']);
  }
}
