import { AuthGuard } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtHelper } from 'angular2-jwt'

import { HomeComponent } from 'app/home/home.component';
import { LoginComponent } from 'app/login/login.component';
import { CoursesComponent } from 'app/courses/courses.component';
import { AppComponent } from './app/app.component';
import { RegisterComponent } from 'app/register/register.component';
import { CourseComponent } from './course/course.component';
import { NoteComponent } from './note/note.component';
import { HeaderComponent } from './header/header.component';
import { NewcourseComponent } from './newcourse/newcourse.component';
import { EditcourseComponent } from './editcourse/editcourse.component';
import { NewnoteComponent } from './newnote/newnote.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { DeletenoteComponent } from './deletenote/deletenote.component';
import { DeletecourseComponent } from './deletecourse/deletecourse.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CoursesComponent,
    AppComponent,
    RegisterComponent,
    CourseComponent,
    NoteComponent,
    HeaderComponent,
    NewcourseComponent,
    EditcourseComponent,
    NewnoteComponent,
    EditnoteComponent,
    DeletenoteComponent,
    DeletecourseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      //change courses to courses
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'courses/:course', component: CourseComponent, canActivate: [AuthGuard] },
      { path: 'courses/course/add/new', component: NewcourseComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/course/edit/:course_id', component: EditcourseComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/course/delete/:course_id', component: DeletecourseComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/:note_id', component: NoteComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/note/add/new', component: NewnoteComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/note/edit/:note_id', component: EditnoteComponent, canActivate: [AuthGuard]  },
      { path: 'courses/:course/note/delete/:note_id', component: DeletenoteComponent, canActivate: [AuthGuard]  },
    ])
  ],
  providers: [JwtHelper, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

