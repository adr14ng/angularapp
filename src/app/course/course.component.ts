import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: string = null;
  course_notes: any;
  apiUrl = environment.urlAddress;


  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.course = urlParameters['course'];
    }); 

    let token = localStorage.getItem("jwt");
    this.http.get(this.apiUrl+"/api/courses/" + this.course , {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response =>  {
      this.course_notes = response;
    }, err => {
      console.log(err);
    });

  }

  goToNotePage(note_id) {
    this.router.navigate(['courses/'+ this.course, note_id]);
  };

  goToEditNote(note_id) {
    this.router.navigate(['courses/'+ this.course + '/note/edit/' + note_id]);
  }

  goToDeleteNote(note_id) {
    this.router.navigate(['courses/'+ this.course + '/note/delete/' + note_id]);
  }

  goToAddNote() {
    this.router.navigate(['courses/'+ this.course +'/note/add/new']);
  }

}
