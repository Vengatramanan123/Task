import { Component } from '@angular/core';
import { AuthserviceService } from '../Service/authservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.scss'
})
export class AddtaskComponent {

  taskform : FormGroup | any;
  users : any;
  constructor(public service : AuthserviceService,public route:Router,public form :FormBuilder) {}

  ngOnInit(){
    this.taskform = this.form.group({
      Date :[''],
      actualDate : [''],
      category:[''],
      timeTaken :[''],
      task :[''],
      assignedTo:[''],
      status :[''],
      priority :[''],
    })
    var url = 'Login/users'
    this.service.get(url).subscribe((data:any)=>{
      this.users = data.map((user:any)=>user.user_name)
      console.log(this.users)
    })
  }
  onsubmit(){
    console.log(this.taskform.value)
    if(this.taskform.value == null){
      alert("Please fill all the fields")
    }
    else{
    var url = 'Task/AddTask'
    this.service.post(url,this.taskform.value).subscribe((task:any)=>{
      console.log(task)
      this.route.navigate(['/dashboard'])
    })
  }
  }
  onclose(){
    this.route.navigate(['/dashboard']);
  }
}
