import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../Service/authservice.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form : any;
  loginform : FormGroup | any;
  constructor(public formBuilder:FormBuilder, private Service: AuthserviceService,private router : ActivatedRoute,private route : Router){}

  ngOnInit(): void {
   this.loginform = this.formBuilder.group({
    username : [''],
    password : ['']
   })
   
  }
  
  onSubmit(){
    console.log(this.loginform.value)
    
    var url = 'Auth/Login';
    this.Service.post(url,this.loginform.value).subscribe((user:any)=>{
      if (user.token) {
        sessionStorage.setItem('username', user.username);    
        this.route.navigate(['/dashboard']); 
      } else {
        alert(user.message);  
      }
    });
  }
}
