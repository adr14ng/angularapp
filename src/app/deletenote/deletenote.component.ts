import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-deletenote',
  templateUrl: './deletenote.component.html',
  styleUrls: ['./deletenote.component.css']
})
export class DeletenoteComponent implements OnInit {

  course: string = null;
  note_id: number = null;
  note_title: string = null;
  note_text: string = null;
  date: string = null;
  apiUrl = environment.urlAddress;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.course = urlParameters['course'];
      this.note_id = urlParameters['note_id'];
    }); 

    let token = localStorage.getItem("jwt");
    this.http.get(this.apiUrl+"/api/courses/"+ this.course +"/"+ this.note_id , {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response =>  {
      this.date = moment(response[0].date).format("MMMM Do YYYY, h:mm:ss a");
      this.note_text = response[0].noteText;
      this.note_title = response[0].noteTitle;
    }, err => {
      console.log(err);
    });

  }

  deleteNote(){
    let token = localStorage.getItem("jwt");
    this.http.delete(this.apiUrl+"/api/courses/"+ this.course 
    +"/note/delete/" + this.note_id, {
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
      this.router.navigate(["/courses/" + this.course]);

    });
  }



}
