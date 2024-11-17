import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../Service/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignunassignuser',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './assignunassignuser.component.html',
  styleUrl: './assignunassignuser.component.scss'
})
export class AssignunassignuserComponent {
  users : any[]=[];
  userId: any;
  transferform : FormGroup | any;
  name : string[]=[];
  
  constructor(public service : AuthserviceService,public ActivateRoute : ActivatedRoute,public form : FormBuilder){}

  ngOnInit(){
    this.userId = this.ActivateRoute.snapshot.paramMap.get('id') || '';
    this.user();
    this.transferform = this.form.group({
      name : ['']
    })
  }
  user(){
    var url ='Login/users';
    this.service.get(url).subscribe((user : any)=>{
      this.users = user;
     
     for(let i = 0;i<this.users.length;i++){
      this.name = this.users[i].name;
      console.log(this.name)
     }
    
    })
  }

  transfer(id: any) { 
    debugger
    const url = `Task/Transfer/${id}`;
    console.log('Form Data Before Post:', this.transferform.value); // Check data here
  
    this.service.post(url, this.transferform.value).subscribe((transfer: any) => {
      if (transfer) {
        this.transferform.patchValue({
          assignedTo: transfer.name
        });
        console.log('Form Data After Response:', this.transferform.value);
      }
    });
  }
  
}
