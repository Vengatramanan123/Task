import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../Service/authservice.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {

  userForm :FormGroup | any;
  constructor(public form : FormBuilder,public route :Router, public service :AuthserviceService){}
  ngOnInit(){
    this.userForm = this.form.group({
      user_name :[''],
      Email:[''],
      Name:[''],
      PhoneNo:[''],
      password:[''],
      Hashed_password:[''],
      user_type : ['']
    })
  }

  onSubmit(){
    
    console.log(this.userForm.value)
    var url ='Login/register'
    this.service.post(url,this.userForm.value).subscribe((user:any)=>{
      console.log(user)
      this.route.navigate(['/dashboard'])
    });
  }
  OnClose(){
    this.route.navigate(['/dashboard'])
  }
}
