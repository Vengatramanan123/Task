import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { AssignunassignuserComponent } from './assignunassignuser/assignunassignuser.component';

export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'}, // default route
    {path:'login', component:LoginComponent},
    {path:'dashboard' , component:DashboardComponent },
    {path:'AddUser', component:AdduserComponent},
    {path:'AddTask',component:AddtaskComponent},
    {path:'EditTask/:id',component:EdittaskComponent},
    {path:'AssignUnassign/:id',component:AssignunassignuserComponent}
];
