import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../Service/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.scss'
})
export class EdittaskComponent {
  taskeditform : FormGroup | any;
  users : any;
  taskId: string = ''; 
  constructor(public service : AuthserviceService,public route : Router , public form : FormBuilder,private activateroute : ActivatedRoute){}

  ngOnInit(){
    this.taskeditform = this.form.group({
      Date :[''],
      actualDate : [''],
      category:[''],
      timeTaken :[''],
      task :[''],
      assignedTo:[''],
      status :[''],
      priority :[''],
    })

    this.taskId = this.activateroute.snapshot.paramMap.get('id') || '';
    if (this.taskId) {
      const url = `Task/GetTask/${this.taskId}`;
      this.service.getdata(url,this.taskId).subscribe((data: any) => {
        if (data) {
          this.taskeditform.patchValue({
            Date: data.date,             
            actualDate: data.actualDate, 
            category: data.category,
            timeTaken: data.timeTaken,
            task: data.task,
            assignedTo: data.assignedTo,
            status: data.status,
            priority: data.priority
          });
        }
      });
    }
    var url = 'Login/users'
    this.service.get(url).subscribe((data:any)=>{
      this.users = data.map((user:any)=>user.user_name)
      console.log(this.users)
    })
  }

  onUpdate(){
    console.log(this.taskeditform.value);
    var url = `Task/UpdateTask/${this.taskId}`;
    this.service.post(url,this.taskeditform.value).subscribe((updateTask : any)=>{
      if(updateTask){
        this.taskeditform.patchValue({
          Date: updateTask.date,             
            actualDate: updateTask.actualDate, 
            category: updateTask.category,
            timeTaken: updateTask.timeTaken,
            task: updateTask.task,
            assignedTo: updateTask.assignedTo,
            status: updateTask.status,
            priority: updateTask.priority
        })
        this.route.navigate(['/dashboard'])
      }
    })
  }
  onclose(){
    this.route.navigate(['/dashboard']);
  }
}
