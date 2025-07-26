import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveListComponent } from './components/leave-list/leave-list.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './guards/role.guard';
import { RegisterComponent } from './components/register/register.component';
import { TeamLeaveListComponent } from './components/team-leave-list/team-leave-list.component';

export const routes: Routes = [  
  { path: '', component: LeaveListComponent, canActivate: [RoleGuard], data: { roles: ['User', 'Admin'] }},
  { path: 'request', component: LeaveRequestComponent, canActivate: [RoleGuard], data: { roles: ['User', 'Admin'] }},
  { path: 'request/:id', component: LeaveRequestComponent, canActivate: [RoleGuard], data: { roles: ['User','Admin'] }},
  { path: 'team', component: TeamLeaveListComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] }},
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];