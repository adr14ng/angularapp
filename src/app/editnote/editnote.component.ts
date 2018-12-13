import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})
export class EditnoteComponent implements OnInit {

  course: string = null;
  note_id: number = null;
  note_title: string = null;
  note_text: string = null;
  apiUrl = environment.urlAddress;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

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
      this.note_text = response[0].noteText;
      this.note_title = response[0].noteTitle;
    }, err => {
      console.log(err);
    });

  }

  // Fix the below to edit

  editNote(form: NgForm) {
    let token = localStorage.getItem("jwt");
    let editNote = JSON.stringify(form.value);
    this.http.post(this.apiUrl+"/api/courses/"+ this.course 
    +"/note/edit/" + this.note_id, editNote, {
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
