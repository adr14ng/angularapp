import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-deletecourse',
  templateUrl: './deletecourse.component.html',
  styleUrls: ['./deletecourse.component.css']
})
export class DeletecourseComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }
  
  course: string = null;
  course_id: number = null;
  apiUrl = environment.urlAddress;

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.course = urlParameters['course'];
      this.course_id = urlParameters['course_id'];
    }); 
  }

  deleteCourse(){
    let token = localStorage.getItem("jwt");
    this.http.delete(this.apiUrl+"/api/courses/"+ this.course 
    +"/course/delete/" + this.course_id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      //this.router.navigate(["/courses/" + this.course]);
    }, err => {
      //for now this is what happens when we get a 200 because there is no response TODO
      //Add route to handle error
      //Something like oops! That note already exists!
      //this.router.navigate(["/courses"]);
      this.router.navigate(["/courses/"]);

    });
  }

}
