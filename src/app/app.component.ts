import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { AuthserviceService } from './Service/authservice.service';
import { Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  username : any;
  constructor(private authservice: AuthserviceService,private route : Router,private http : HttpClient) {}

  ngOnInit(): void {
    this.showNavBar();
    this.getLoggedInUser(); 
  }
  showNavBar(){
    return this.route.url !="/login";
  }
  getLoggedInUser() {
    
    this.username = sessionStorage.getItem('username'); // Retrieve username from session storage
  }
  user(){
    this.route.navigate(['/AddUser']);
  }
 
  logout(){
    var url = 'Auth/logout'
    this.authservice.post(url,{}).subscribe(()=>{
      sessionStorage.clear();
      this.route.navigate(['/login']);
    })
  }
}
  