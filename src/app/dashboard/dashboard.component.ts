import { Component } from '@angular/core';
import { AuthserviceService } from '../Service/authservice.service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users : any[]= [];
  tasks : any[]=[];
  contact: any;
  TaskCounts :any[]=[];
  totalTask : any;
  openTask:any;
  closeTask :any;
  bugs :any[]=[];
  opentask :any []=[];
  closetask :any[]=[];
  username : any;
  constructor(private service : AuthserviceService,public route : Router){}

  ngOnInit(){
    this.dashboard();
    this.chart();
    this.task();
    this.taskcount();
    this.bug();
  }
  dashboard(){
    var url = 'Login/users'
    this.service.get(url).subscribe((data:any)=>{
      this.users = data
      console.log(this.users)
      this.contact = this.users[0].email + ' / ' + this.users[0].phoneNo
    })
  }
  task(){
    var url ='Task/Tasks'
    this.service.get(url).subscribe((task:any)=>{
      this.username = sessionStorage.getItem('username');
      this.tasks = task;
    })
  }
  bug(){
    var url = 'Task/Tasks'
    this.service.get(url).subscribe((task:any)=>{
      this.bugs = task;
      this.opentask = this.bugs.filter((Tasks=>Tasks.status == 'Open'));
      this.closetask = this.bugs.filter((Tasks=>Tasks.status == 'Close'));
    })
  }
  taskcount(){
    var url ='Task/TaskCount';
    this.service.get(url).subscribe((count:any)=>{
      this.TaskCounts = count;
      this.totalTask = this.TaskCounts[0].count;
      this.openTask = this.TaskCounts[1].count;
      this.closeTask = this.TaskCounts[2].count;
    })
  }
  chart(){
    var url = 'Task/TaskCount';
    this.service.get(url).subscribe((response: any[]) => {
      const totalCount = response.find((item) => item.taskType === "Total")?.count || 0;
      const openCount = response.find((item) => item.taskType === "Open")?.count || 0;
      const closeCount = response.find((item) => item.taskType === "Close")?.count || 0;
    
      var options = {
        series: [totalCount, openCount, closeCount], 
        chart: {
          type: 'donut',
        },
        labels: ["Total Tasks", "Open Tasks", "Closed Tasks"], 
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    });
    
  }
  addtask(){
    this.route.navigate(['/AddTask']);
  }
  Edit(id: any) {
    this.route.navigate(['/EditTask', id]);  
  }
  assign(id: any){
    this.route.navigate(['/AssignUnassign',id])
  }

  export_excel(){
    var url ='Task/ExportTask'
    this.service.exportexcel(url).subscribe((excel: any)=>{
      const blob = excel;
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement('a'); 
      a.style.display = 'none'; 
      a.href = url; 
      a.download = 'Tasks.xlsx'; 
      document.body.appendChild(a); 
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
}
