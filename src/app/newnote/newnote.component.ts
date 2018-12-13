import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})
export class NewnoteComponent implements OnInit {

  course: string = null;
  apiUrl = environment.urlAddress;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.course = urlParameters['course'];
    }); 
    
  }

  newNote(form: NgForm) {
    let token = localStorage.getItem("jwt");
    let newNote = JSON.stringify(form.value);
    this.http.post(this.apiUrl+"/api/courses/"+ this.course +"/note/add/new", newNote, {
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
